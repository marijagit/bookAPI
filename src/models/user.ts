import bcrypt from 'bcrypt';

export class User {
    public username: string;
    private hashedPassword: string;

    private constructor(username: string, hashedPassword: string) {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    static async create(username: string, password: string) {
        let hashedPassword;
        try {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        } catch (error) {
            throw new Error('Internal error during password hashing.');
        }
        return new User(username, hashedPassword);
    }

    async validatePassword(password: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, this.hashedPassword);
        } catch (error) {
            throw new Error('Internal error during password hashing.');
        }
    }

    // fja koja validira kompleksnost sifre pri registraciji
}