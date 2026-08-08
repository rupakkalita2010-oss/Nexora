import type { Product } from "./marketplace";
import { supabase } from "@/lib/lib/supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase Error:", error);
    return [];
  }

  return data.map((item): Product => ({
    id: item.id,
    user_id: item.user_id,
    title: item.title,
    category: item.category,

    creator:
      item.creator ??
      item.user_name ??
      "Independent Creator",

    initials:
      item.creator
        ? item.creator
            .split(" ")
            .map((word: string) => word[0])
            .join("")
            .toUpperCase()
        : "DC",

    price: item.price,
    rating: item.rating ?? 5,
    reviews: item.reviews ?? 0,
    likes: item.likes ?? 0,
    downloads: item.downloads ?? 0,
    tags: item.tags ?? [],
    art: item.art ?? "brand",

    description: item.description,
    image_url: item.image_url,

    badge: item.badge ?? undefined,
  }));
}

export async function addProduct(product: {
  title: string;
  category: string;
  price: number;
  description: string;
  imageFile: File | null;
downloadFile: File | null;
})

{
  let imageUrl = "";
  let downloadUrl = "";

  if (product.imageFile) {
    const fileName = `${Date.now()}-${product.imageFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, product.imageFile);

    if (uploadError) {
      console.log(uploadError);
      alert(JSON.stringify(uploadError, null, 2));
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }
  if (product.downloadFile) {
  const fileName = `downloads/${Date.now()}-${product.downloadFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, product.downloadFile);

  if (uploadError) {
    console.error(uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("products")
    .getPublicUrl(fileName);

  downloadUrl = data.publicUrl;
}

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("You must be logged in to upload a product.");
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        title: product.title,
        category: product.category,
        price: product.price,
        description: product.description,
        image_url: imageUrl,
        download_url: downloadUrl,
        user_id: user.id,
        creator:
          user.user_metadata?.name ??
          user.email?.split("@")[0] ??
          "Independent Creator",
      },
    ])
    .select();

  if (error) {
    alert(
      `${error.code}\n${error.message}\n${error.details}\n${error.hint}`
    );

    console.error(error);
    throw error;
  }

  return data;
}
export async function deleteProduct(productId: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId)
    .eq("user_id", user.id)
    .select("id");

  if (error) {
    console.error("Delete product error:", error);
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Product was not deleted.");
  }

  return true;
}

/* ===========================
   CART FUNCTIONS
=========================== */

export async function addToCart(productId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("cart")
    .insert({
      user_id: user.id,
      product_id: productId,
    })
    .select();

  if (error) throw error;

  return data;
}

export async function getCart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("cart")
    .select(`
      id,
      products(*)
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  return data;
}

export async function removeFromCart(cartId: number) {
  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("id", cartId);

  if (error) throw error;
  
}
/* ===========================
   ORDER FUNCTIONS
=========================== */

export async function createOrder(product: Product) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      product_id: product.id,
      price: product.price,
    })
    .select();

  if (error) throw error;

  return data;
}

export async function getOrders() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      products(*)
    `)
    .eq("user_id", user.id);

  if (error) throw error;
  

  return data;
}
export async function clearCart() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("cart")
    .delete()
    .eq("user_id", user.id);

  if (error) throw error;
}