import { readFileSync, writeFileSync } from 'fs';
import pkg from '@prisma/internals';
import type { DMMF } from '@prisma/generator-helper';
import { v4 as uuidv4 } from 'uuid';
import cuid from 'cuid';
const { getDMMF } = pkg;
import { firstNamesByCountry, lastNamesByCountry, addressesByCountry, phoneConfigByCountry, excludedModels } from './dataRessources';
import { PRODUCTS } from '../../mock/index'

// Configuration
const ITEMS_PER_ORDER = 5;
const ORDERS_PER_USER = 2;
const ORDER_TAX_RATE = 0.2;
const DEFAULT_SHIPPING = 5.0;

// Random utilities
type Scalar = string | number | boolean | object | null;

function randomNumberString(len: number): string {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
}
function formatPhone(code: string): string {
    const cfg = phoneConfigByCountry[code] || { prefix: '+1', length: 10 };
    return `${cfg.prefix} ${randomNumberString(cfg.length)}`;
}
function generatePlaceholder(model: string, field: DMMF.Field, i: number): Scalar {
    switch (field.type) {
        case 'String': return `${model}_${field.name}_${i}`;
        case 'Int': return i;
        case 'Float': return i + 0.5;
        case 'Boolean': return i % 2 === 0;
        case 'DateTime': { const d = new Date(); d.setDate(d.getDate() - i); return d.toISOString(); }
        case 'Json': return { placeholder: `${field.name}_${i}` };
        default: return null;
    }
}
function generateFieldValue(model: string, field: DMMF.Field, i: number): Scalar {
  const def = field.default;
  if (def && typeof def === 'object' && 'name' in def) {
    if (def.name === 'cuid') return cuid();
    if (def.name === 'uuid') return uuidv4();
  }
    return generatePlaceholder(model, field, i);
}

async function main() {
    const schema = readFileSync('./generated/prisma/schema.prisma', 'utf-8');
    const dmmf = await getDMMF({ datamodel: schema });
const datamodel = dmmf.datamodel;

    // Prepare enums
  const enumsMap: Record<string, string[]> = {};
    datamodel.enums.forEach(en => enumsMap[en.name] = en.values.map(v => v.name));

    const sampleCount = 2; // Nombre d'échantillons à générer
    const output: Record<string, any[]> = {}; // Objet pour stocker les données générées
    const modelIds: Record<string, Scalar[]> = {}; // Objet pour stocker les IDs des modèles
    const userCountries: string[] = []; // Tableau pour stocker les pays des utilisateurs

    // 1) Générer des IDs pour chaque modèle
    datamodel.models.forEach(model => {
        const idField = model.fields.find(f => f.isId); // Trouve le champ ID du modèle
        if (!idField) return; // Si aucun champ ID n'est trouvé, passe au modèle suivant
        output[model.name] = []; // Initialise le tableau pour le modèle dans l'objet de sortie
        modelIds[model.name] = []; // Initialise le tableau pour stocker les IDs du modèle
        // Génère des échantillons pour le modèle
        for (let i = 0; i < sampleCount; i++) {
            if (excludedModels.has(model.name)) return; // Ignore les modèles exclus
            const id = generateFieldValue(model.name || "", idField, i); // Génère une valeur pour le champ ID
            modelIds[model.name].push(id); // Ajoute l'ID au tableau des IDs du modèle
            output[model.name].push({ [idField.name]: id }); // Ajoute l'objet avec l'ID au tableau
            if (model.name === 'User') userCountries.push(Object.keys(firstNamesByCountry)[i % Object.keys(firstNamesByCountry).length]); // Ajoute le pays de l'utilisateur au tableau
        }
    });
    // 2) Générer des données pour chaque modèle
    datamodel.models.forEach(model => {
        if (excludedModels.has(model.name)) return; // Ignore les modèles exclus
        const modelToUpdate = output[model.name]; // Récupère le tableau des objets pour le modèle
  if (!Array.isArray(modelToUpdate)) return;  // ← si on n’a rien généré pour ce modèle, on skip

        modelToUpdate.forEach((obj, i) => {
            const country = model.name === 'User' ? userCountries[i] : model.name === 'Address' ? userCountries[i] : ""; // Définit le pays en fonction du modèle

            model.fields.forEach(field => {
                if (field.isId) return; // Ignore les champs ID

                // 1) Gestion des clés étrangères scalaires (ex : Post.authorId)
                const relObj = model.fields.find(f =>
                    f.kind === 'object'
                    && Array.isArray(f.relationFromFields)
                    && f.relationFromFields.includes(field.name)
                );

                if (relObj) {
                    // relObj.relationName === "UserPosts", relObj.type === "User"
                    const relatedModelName = relObj.type;
                    const pool = modelIds[relatedModelName] || [];
                    obj[field.name] = pool[i % pool.length];
                    return;  // on sort, pour éviter de regénérer un placeholder
                }
                // Champs de type liste (relations many-to-many ou one-to-many)
                if (field.isList && field.relationName) {
                    const values = []; // Initialise un tableau pour stocker les valeurs de la liste
                    const relationField = model.fields.find(f => f.kind === 'object' && f.relationName === field.relationName); // Récupere la relation du champ
                    if (relationField?.type === model.name) {
                        obj[field.name] = [];
                        return;
                    }
                    const relatedModel = datamodel.models.find(m => m.name === relationField?.type); // Trouve le modèle lié
                    const relatedModelContent = output[relatedModel!.name]; // Récupère le contenu du modèle lié
                    values.push(relatedModelContent[i]); // Ajoute l'ID du modèle lié au tableau de valeurs
                    obj[field.name] = values; // Ajoute le tableau de valeurs à l'objet
                    return;
                }
                // 2) Gestion des énumérations
                if (field.kind === 'enum') {
                    const vals = enumsMap[field.type] || []; // Récupère les valeurs de l'énumération
                    if (vals.length) obj[field.name] = vals[i % vals.length]; // Ajoute une valeur aléatoire à l'objet
                    return;
                }

                // Cas particulier : modèle User
                if (model.name === 'User') {
                    const fn = firstNamesByCountry[country][i % 10];
                    const ln = lastNamesByCountry[country][i % 10];
                    switch (field.name) {
                        case 'firstName': obj.firstName = fn; return;
                        case 'lastName': obj.lastName = ln; return;
                        case 'name': obj.name = `${fn} ${ln}`; return;
                        case 'email': obj.email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`; return;
                        case 'phone': obj.phone = formatPhone(country); return;
                        default:
                            if (field.type === 'String' && !field.isList)
                                obj[field.name] = generateFieldValue(model.name, field, i);
                            return;
                    }
                }
                // Cas particulier : modèle Address
                if (model.name === 'Address') {
                    const address = addressesByCountry[country];
                    switch (field.name) {
                        case 'fullName': obj.fullName = output['User'][i].name; return;
                        case 'street': obj.street = `${i + 1} ${address.streets[i % address.streets.length]}`; return;
                        case 'city': obj.city = address.cities[i % address.cities.length]; return;
                        case 'postalCode': obj.postalCode = address.postalCodes[i % address.postalCodes.length]; return;
                        case 'country': obj.country = address.country; return;
                        case 'phone': obj.phone = output['User'][i].phone; return;
                        default:
                            if (field.type === 'String' && !field.isList) {
                                obj[field.name] = generateFieldValue(model.name, field, i);
                            } else if (field.kind === 'scalar' && !field.isList) {
                                obj[field.name] = generateFieldValue(model.name, field, i); // Génère une valeur pour le champ
                            }
                            return;
                    }
                }

                // Cas particulier : Order
                if (model.name === 'Order') {
                    output['Order'] = [];
                    modelIds['Order'] = [];

                    modelIds['User'].forEach((userId, uIdx) => {
                        for (let j = 0; j < ORDERS_PER_USER; j++) {
                            const idField = model.fields.find(f => f.isId);
                            if (!idField) return; // Si aucun champ ID n'est trouvé, passe au modèle suivant
                            const orderId = generateFieldValue('Order', idField, uIdx * ORDERS_PER_USER + j);

                            // Construit l'objet order
                            const order = {
                                id: orderId,
                                userId: userId,
                                status: 'pending',
                                paymentStatus: 'pending',
                                shippingStatus: 'pending',
                                totalAmount: 0,
                                subtotal: 0,
                                taxAmount: 0,
                                shippingCost: 5.00,
                                discount: 0,
                            };

                            // Stocke dans output et modelIds
                            output['Order'].push(order);
                            modelIds['Order'].push(orderId);
                        }
                    })
                    return;
                }

                // Champs string simples (non relationnels, non list)
                if (field.type === 'String' && !field.isId && !field.isList && !field.relationName) {
                    const value = generateFieldValue(model.name, field, i); // Génère une valeur pour le champ
                    obj[field.name] = value; // Ajoute la valeur à l'objet
                    return;
                }
                // Champs scalaires (non relationnels, non list)
                if (field.kind === 'scalar' && !field.isId && !field.isList && !field.relationName) {
                    const value = generateFieldValue(model.name, field, i); // Génère une valeur pour le champ
                    obj[field.name] = value; // Ajoute la valeur à l'objet
                    return;
                }
            });
        })
    });

    // 3) Post-traitement des OrderItem : on lie les items aux commandes
    const totalOrders = output.Order.length;
    output['OrderItem'] = [];
    modelIds['OrderItem'] = [];

    for (let o = 0; o < totalOrders; o++) {
        const order = output.Order[o];

        for (let k = 0; k < ITEMS_PER_ORDER; k++) {
            const prod = PRODUCTS[(o * ITEMS_PER_ORDER + k) % PRODUCTS.length];
            const idField = datamodel.models.find(m => m.name === 'OrderItem')?.fields.find(f => f.isId);
            if (!idField) continue; // Si aucun champ ID n'est trouvé, passe à l'itération suivante
            const itemId = generateFieldValue('OrderItem', idField, o * ITEMS_PER_ORDER + k);
            const saleOptions = prod.options.find(o => o.name === 'Prix de vente');
            if (!saleOptions) continue; // Si aucune option de vente n'est trouvée, passe à l'itération suivante
            const optionValue = saleOptions.values[(k % saleOptions.values.length)];
            
            const sku = optionValue.sku || `${order.id}-${k}`;
            const qty = optionValue.quantity || 1; // Quantité par défaut à 1 si non spécifiée
            const unitPrice = Number(((optionValue.unitPrice ?? prod.price ?? 0).toFixed(2))); // Prix unitaire (ou prix par défaut)
            const totalPrice = Number((unitPrice * qty).toFixed(2));

            const item = {
                id: itemId,
                orderId: order.id,
                productId: prod.id,
                productName: prod.name,
                sku: sku,
                quantity: qty,
                unitPrice: unitPrice,
                totalPrice: totalPrice,
                refundStatus: 'none',
                returnEligible: true,
            };

            output['OrderItem'].push(item);
            modelIds['OrderItem'].push(itemId);
            order.items = order.items || []; // Initialise le tableau des items de la commande
            order.items.push(item); // Ajoute l'item à la commande
        }
    }

    // 3) Post-traitement des Orders : calcul des montants
    if (Array.isArray(output.Order)) {
        output['Payment'] = [];
        modelIds['Payment'] = [];

        output.Order.forEach(order => {
            const items = Array.isArray(order.items) ? order.items : []; // on récupère les items (déjà mockés)
            const subtotal = items.reduce((sum: any, it: { totalPrice: any; }) => sum + (it.totalPrice || 0), 0); // Calcul du sous-total hors taxe
            const taxAmount = Number((subtotal * 0.2).toFixed(2)); // Taxe (ici 20%)
            const shippingCost = subtotal + taxAmount >= 70 ? 0 : 5.00; // Frais de port (0 si commande > 70€)
            const discount = typeof order.discount === 'number' ? order.discount : 0; // Remise par défaut si absent
            const totalAmount = subtotal + taxAmount + shippingCost - discount; // Total TTC
            const paymentId = uuidv4(); // Génération d'un ID de paiement
            // Prépare l’objet Payment
            const payment = {
                id: paymentId,
                method: 'visa',    // ou 'stripe', etc.
                currency: 'EUR',
                provider: 'stripe',
                transactionId: null,
                status: 'pending', // statut initial
                amount: null,      // à remplir en post-traitement
                paidAt: null,
                refundedAmount: null,
            };
            // On réécrit dans l’objet
            order.subtotal = subtotal;
            order.taxAmount = taxAmount;
            order.shippingCost = shippingCost;
            order.discount = discount;
            order.totalAmount = totalAmount;

            output['Payment'].push(payment);
            modelIds['Payment'].push(paymentId);
            order.paymentId = paymentId; // On lie le paiement à la commande
        });
    }
    // 4) Post-traitement des Payments : caler le montant sur la commande
    if (Array.isArray(output.Payment)) {
        output['Payment'].forEach(payment => {
            // on repère l'Order qui référence ce payment
            const order = (output['Order']).find(o => o.paymentId === payment.id);
            if (order) {
                payment.amount = order.totalAmount; // on copie le total TTC dans le montant payé
                payment.paidAt = new Date().toISOString(); // on marque la date de paiement maintenant
                payment.status = 'paid'; // on positionne le statut sur “paid”
                payment.method = 'visa'; // 
                payment.currency = 'eur';
                payment.provider = 'stripe'
            }
        });
    }

    writeFileSync('./prisma/test-generator.json', JSON.stringify(output, null, 2), 'utf-8');
}
main().then(() => {
    console.log('Data generation completed.');
}).catch(e => {
    console.error('Error during data generation:', e);
});