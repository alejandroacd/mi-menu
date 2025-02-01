'use server'
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";
export async function  GET  (req: NextRequest) {
    const searchParams = new URLSearchParams(req.nextUrl.search);
    const restaurantId = searchParams.get('restaurant_id');

    if (!restaurantId) {
        return NextResponse.json({ error: 'user_id parameter is missing' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
    .from('restaurants')
    .select('menu_items')
    .eq('id', restaurantId)
    .single()
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) revalidateTag("restaurants");

    return NextResponse.json({ data });
}
