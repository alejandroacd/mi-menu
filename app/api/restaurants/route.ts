'use server'
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
    const supabase = await createClient();
    const request = await req.json();
    const { avatar, name, address, phone, email, description, user_id, facebook, open_hours, instagram, twitter, url } = request;

    const newRestaurant = {
        avatar,
        name,
        address,
        phone,
        email,
        description,
        user_id,
        facebook,
        open_hours,
        instagram,
        twitter,
        url
    };

    const { error, data } = await supabase
        .from('restaurants')
        .insert([newRestaurant])
        .select('*');
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Invalidate the cache for the "restaurants" tag to trigger re-fetch
    revalidateTag("restaurants");
    console.log("Cache revalidated for restaurants");
    
    // Return the newly created restaurant data with a status of 201 (Created)
    return NextResponse.json({ data }, { status: 201 });
}

export const GET = async (req: NextRequest) => {
    const searchParams = new URLSearchParams(req.nextUrl.search);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json({ error: 'user_id parameter is missing' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('restaurants').select('*').eq('user_id', user_id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data) revalidateTag("restaurants");

    return NextResponse.json({ data });
}


export async function PUT(req: NextRequest) {
    const supabase = await createClient();
    const request = await req.json();
    const { id, avatar, name, address, phone, email, description, user_id, facebook, open_hours, instagram, twitter, url } = request;

    if (!id) {
        return NextResponse.json({ error: 'Restaurant ID is required' }, { status: 400 });
    }

    const updatedRestaurant = {
        avatar,
        name,
        address,
        phone,
        email,
        description,
        user_id,
        facebook,
        open_hours,
        instagram,
        twitter,
        url
    };

    const { data, error } = await supabase
        .from('restaurants')
        .update(updatedRestaurant)
        .eq('id', id)
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Invalidate the cache for the "restaurants" tag to trigger re-fetch
    revalidateTag("restaurants");

    // Return the updated restaurant data with a status of 200 (OK)
    return NextResponse.json({ data }, { status: 200 });
}
