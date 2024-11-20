/** @format */

// /** @format */

// import {PrismaClient} from "@prisma/client";

// declare global {
// 	let prisma: PrismaClient | undefined;
// }

// const client =
// 	(globalThis as unknown as {prisma: PrismaClient}).prisma ||
// 	new PrismaClient();

// if (process.env.NODE_ENV !== "production")
// 	(globalThis as unknown as {prisma: PrismaClient}).prisma = client;

// export default client;

import {PrismaClient} from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
