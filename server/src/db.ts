import { createClient } from "@supabase/supabase-js";
import process from "process";

const supabaseUrl = process.env.SUPABASE_URL as string;

const supabaseKey = process.env.SUPABASE_KEY as string;

const psqlDb = createClient(supabaseUrl, supabaseKey);

const lol = async () => {
  let ab = await psqlDb.from("categories").select("*");
  console.log(ab, "DGDFGF");
};

lol();

export default psqlDb;
