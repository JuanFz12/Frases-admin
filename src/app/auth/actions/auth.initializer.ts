import { AuthService } from "../services/auth.service";

export async function runAuthInitializer(auth: AuthService) {
    const token = auth.token();
    if (!token) return;

    try {
        await auth.checkStatus.mutateAsync();
    } catch (err){
        console.error(err)
    }
}
