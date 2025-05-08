"use client";

import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "./textarea";
import Combobox from "./ComboBox";
import ImagePicker from "./image-picker";
import React from "react";
import { uploadImageAction } from "@/src/lib/database/vercel-blob/vercel-blob.action";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Info } from "lucide-react";

type EditableTextFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};

export const EditableTextField = ({
  label,
  value,
  onSave,
  placeholder,
  disabled,
}: EditableTextFieldProps) => {
  const {
    editing,
    currentValue,
    loading,
    setCurrentValue,
    setEditing,
    handleSave,
    handleCancel,
    handleKeyDown,
  } = useEditable(value, onSave);

  return (
    <div className="flex gap-4 items-center h-9">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :
      </label>

      {!editing ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">{value || "—"}</span>
          {!disabled && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              ✏️
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full"
            disabled={loading}
          />
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleSave}
            disabled={loading}
          >
            ✔
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌
          </Button>
        </div>
      )}
    </div>
  );
};

type EditableTextAreaFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};

export const EditableTextAreaField = ({
  label,
  value,
  onSave,
  placeholder,
  disabled,
}: EditableTextAreaFieldProps) => {
  const {
    editing,
    currentValue,
    loading,
    setCurrentValue,
    setEditing,
    handleSave,
    handleCancel,
    handleKeyDown,
  } = useEditable(value, onSave);

  return (
    <div className="flex flex-col items-start mb-4">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :{" "}
        {!disabled && (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            ✏️
          </Button>
        )}
      </label>

      {!editing ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">{value || "—"}</span>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <Textarea
            rows={4}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full"
            disabled={loading}
          />
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleSave}
            disabled={loading}
          >
            ✔
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌
          </Button>
        </div>
      )}
    </div>
  );
};

type EditableComboboxProps = {
  label: string;
  value: string;
  options: { value: string; label: string; description: string }[];
  onSelect: (value: string) => void | Promise<void>;
  onSave: (newValue: string) => void | Promise<void>;
  onCancel: () => void;
  placeholder?: string;
  disabled?: boolean;
};

export const EditableCombobox = ({
  label,
  value,
  options,
  onSelect,
  onSave,
  onCancel,
  disabled,
}: EditableComboboxProps) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    if (currentValue !== value) {
      await onSave(currentValue);
    }
    setLoading(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value); // reset to original
    setEditing(false);
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex gap-4 items-center h-9">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :
      </label>
      {editing ? (
        <div className="flex items-center gap-2">
          <Combobox
            options={options}
            onSelect={(value) => {
              setCurrentValue(value);
              onSelect(value);
            }}
            placeholder={currentValue}
            initialDisplayCount={5}
          />
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleSave}
            disabled={loading}
          >
            ✔
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm">{value || "—"}</span>
          {!disabled && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              ✏️
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

type EditableURLFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};

export const EditableURLField = ({
  label,
  value,
  onSave,
  placeholder,
  disabled,
}: EditableURLFieldProps) => {
  const {
    editing,
    currentValue,
    loading,
    setCurrentValue,
    setEditing,
    handleSave,
    handleCancel,
    handleKeyDown,
  } = useEditable(value, onSave);

  return (
    <div className="flex gap-4 items-center h-9">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :
      </label>

      {!editing ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">{value || "—"}</span>
          {!disabled && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              ✏️
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="url"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full"
            disabled={loading}
          />
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleSave}
            disabled={loading}
          >
            ✔
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌
          </Button>
        </div>
      )}
    </div>
  );
};

type EditableDateFieldProps = {
  label: string;
  value: string;
  onSave: (newValue: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};

export const EditableDateField = ({
  label,
  value,
  onSave,
  placeholder,
  disabled,
}: EditableDateFieldProps) => {
  const {
    editing,
    currentValue,
    loading,
    setCurrentValue,
    setEditing,
    handleSave,
    handleCancel,
    handleKeyDown,
  } = useEditable(value, onSave);

  return (
    <div className="flex gap-4 items-center h-9">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :
      </label>

      {!editing ? (
        <div className="flex items-center gap-2">
          <span className="text-sm">{value || "—"}</span>
          {!disabled && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              ✏️
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full"
            disabled={loading}
          />
          <Button
            size="sm"
            variant={"outline"}
            onClick={handleSave}
            disabled={loading}
          >
            ✔
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            ❌
          </Button>
        </div>
      )}
    </div>
  );
};

type EditablePicturesFieldProps = {
  label: string;
  value: string[]; // liste d'URLs par exemple
  projectName: string;
  onSave: (newValue: string[]) => void | Promise<void>;
  onDeleteFileUrl?: (fileUrl: string) => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
};

export const EditablePicturesField = ({
  label,
  value,
  projectName,
  onSave,
  onDeleteFileUrl,
  disabled,
}: EditablePicturesFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState<string[]>(value);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Cette fonction est appelée par ImagePicker lors d'une sélection de fichiers
  const handleFileChange = (files: File[]) => {
    setNewFiles(files); // Met à jour l'état local avec les nouveaux fichiers
  };

  const handleSave = async () => {
    setLoading(true);
    const picturesUrls = await uploadImageAction(newFiles, projectName);
    const updatedValue = [...picturesUrls, ...currentValue];
    setCurrentValue(updatedValue);
    await onSave(updatedValue);
    setLoading(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(value); // réinitialise à la valeur d'origine
    setEditing(false);
  };

  const handleDeleteFileUrl = (fileUrl: string) => {
    onDeleteFileUrl?.(fileUrl); // Propager la suppression au composant parent
    const updatedPictures = currentValue.filter(
      (url: string) => url !== fileUrl
    );
    setCurrentValue(updatedPictures);
  };

  return (
    <div className="grid gap-1">
      <label className="text-sm font-medium text-muted-foreground">
        {label} :
        {!disabled && (
            <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
              ✏️
            </Button>
          )}
      </label>
      {!editing ? (
        <div className="flex items-center gap-2">
          {currentValue.length > 0 ? (
            <div className="flex gap-2">
              {currentValue.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Aperçu ${index + 1}`}
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          ) : (
            <span className="text-sm">—</span>
          )}

        </div>
      ) : (
        <div className="flex gap-2">
          {/* Utilisation du composant ImagePicker pour la sélection d'images */}
          <ImagePicker
            filesUrl={currentValue}
            onFileChange={handleFileChange}
            onDeleteFileUrl={handleDeleteFileUrl}
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSave}
              disabled={loading}
            >
              ✔
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              ❌
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

interface Feature {
  id: string;
  name: any;
  description: string;
}

interface Props {
  label?: string;
  value: string[]; // list of feature IDs
  allFeatures: Feature[];
  onSave: (newVal: string[]) => void;
  disabled?: boolean;
}

export default function EditableFeaturesField({
  label = "Fonctionnalités",
  value,
  allFeatures,
  onSave,
  disabled,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState<string[]>(value);

  const handleToggle = (featureId: string) => {
    setLocalValue((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSave = () => {
    onSave(localValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setEditing(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
      {label} :
        {!disabled && (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            ✏️
          </Button>
        )}
      </label>

      {!editing ? (
        <>
          <div className="flex flex-wrap gap-2">
            {allFeatures
              .filter((f) => value.includes(f.id))
              .map((feature) => (
                <span
                  key={feature.id}
                  className="px-2 py-1 bg-muted rounded text-sm"
                >
                  {feature.name}
                </span>
              ))}
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {allFeatures.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  checked={localValue.includes(feature.id)}
                  onCheckedChange={() => handleToggle(feature.id)}
                />
                <Label>{feature.name}</Label>
                <Popover>
                  <PopoverTrigger>
                    <Info className="cursor-pointer" size={14} />
                  </PopoverTrigger>
                  <PopoverContent>{feature.description}</PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={handleSave}>
              Enregistrer
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type UseEditableReturn<T> = {
  editing: boolean;
  currentValue: T;
  loading: boolean;
  setCurrentValue: (value: T) => void;
  setEditing: (value: boolean) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};
export const useEditable = <T,>(
  initialValue: T,
  onSave: (newValue: T) => void | Promise<void>
): UseEditableReturn<T> => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    if (currentValue !== initialValue) {
      await onSave(currentValue);
    }
    setLoading(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setCurrentValue(initialValue); // réinitialiser à la valeur d'origine
    setEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return {
    editing,
    currentValue,
    loading,
    setCurrentValue,
    setEditing,
    handleSave,
    handleCancel,
    handleKeyDown,
  };
};
