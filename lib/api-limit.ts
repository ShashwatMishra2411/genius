import { auth } from "@clerk/nextjs/server";

import prismadb from "./prismadb";

import { apilimit } from "@/constants";

export const increaseApilimit = async () => {
    const { userId } = auth();

    if (!userId)
        return;

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId }
    })
    if (user) {
        await prismadb.userApiLimit.update({
            where: { userId: userId },
            data: { count: user.count + 1 }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 }
        })
    }
}

export const checkApilimit = async () => {
    const { userId } = auth();

    if (!userId)
        return;

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId }
    })

    if (user && user.count >= apilimit) {
        return false;
    }

    return true;
}

export const getCount = async () => {
    const { userId } = auth();

    if (!userId)
        return;

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId }
    })
    if (!user)
        return 0;
    else
        return user?.count;
}