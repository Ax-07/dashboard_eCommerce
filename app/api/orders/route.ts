// app/api/orders/route.ts
import { NextResponse } from "next/server";
import path from 'path'
import fs from 'fs'

export async function GET() {
    const filePath = path.join(process.cwd(), 'src', 'mock', 'test-generator.json')

    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData, { status: 200 })
    } catch (error) {
        console.error('Error reading file:', error)
        return new Response('File not found', { status: 404 })
    }
}