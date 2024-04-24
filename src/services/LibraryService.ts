import { Service } from 'typedi';

@Service()
export class LibraryService {
    public logFromLibrary(message: string): void {
        console.log('🚀 🚀 🚀 Logged message from Library', message);
    }
}
