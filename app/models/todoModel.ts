import { createRealmContext } from "@realm/react";
import { ObjectSchema, Object, BSON } from "realm";

export class ToDoItem extends Object<ToDoItem> {
    _id!: BSON.ObjectId;
    title!: string;
    description?: string;
    deadline?: string;

    static schema: ObjectSchema = {
        name: 'ToDoItem',
        properties: {
            _id: 'objectId',
            title: { type: 'string', indexed: true },
            description: { type: 'string', indexed: true },
            deadline: { type: 'string', indexed: true },
        },
        primaryKey: '_id',
    };
}


export const TodoRealmContext =  createRealmContext({
    schema: [ToDoItem]
})