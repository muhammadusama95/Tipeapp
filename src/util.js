import { v4 as uuidv4 } from "uuid";

export const genrerateUserId = () => uuidv4().split('-').join('')
