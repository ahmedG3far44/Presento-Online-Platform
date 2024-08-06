import credentials from "@/app/credentials/credentials";
import { NextResponse } from "next/server";

const { user, isAdmin, isLogged } = await credentials();

export const POST = async function (request) {
  return NextResponse.json({
    isAdmin,
    isLogged,
    user,
  });
};

export const PUT = async function (request) {};
export const DELETE = async function (request) {};
