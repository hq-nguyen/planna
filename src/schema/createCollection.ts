import { CollectionColors } from '@/lib/constant';
import {z} from 'zod';

export const createCollectionSchema = z.object({
    name: z.string().min(4, {
        message: "Name is required and must be at least 4 characters"}).max(50, {message: "Name must be less than 50 characters"}),
    // description: z.string().max(200, {message: "Description must be less than 200 characters"}).optional(),
    color: z.string().refine(color => Object.keys(CollectionColors).includes(color))
});

export type CreateCollectionSchemaType = z.infer<typeof createCollectionSchema>;