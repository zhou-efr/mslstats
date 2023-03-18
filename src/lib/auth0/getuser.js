import {cookies} from "next/headers";

export const getUser = async () => {
    const res = await fetch(`${process.env.AUTH0_BASE_URL}/api/auth/me`, {
        headers: {
            cookie: `appSession=${cookies().get('appSession')?.value}`
            // cookie: cookies().getAll().map(c => `${c.name}=${c.value}`).join(';') -- all cookies
        }
    })
    return await res.json()
}