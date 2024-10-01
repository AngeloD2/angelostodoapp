import { StyleSheet, Text, TextInput, View, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import 'react-native-get-random-values'
import { BSON } from "realm";
import { useRealm } from "@realm/react";
import { ToDoItem } from "../models/todoModel";

function TodoItem({ item }: { item: ToDoItem }) {

    return (
        <View style={styles.todoItem}>
            <Text style={{ borderWidth: 1, borderRadius: 2, minWidth: 250, textAlign: 'center', textAlignVertical: "center", paddingVertical: 4 }}> {item.title} </Text>
        </View>
    )
}


export default function Todo() {
    const [text, setText] = useState('');

    const realm = useRealm();

    function addItem() {
        if (text.trim() !== '') {
            realm.write(() => {
                realm.create(ToDoItem, {
                    _id: new BSON.ObjectId(),
                    title: text,
                    description: '',
                    deadline: ''
                });
            });
        }
    }

    const items = realm.objects(ToDoItem)

    return (
        <View style={styles.containerView}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type here..."
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
                <Button onPress={addItem} title="Add Item" />
            </View>

            <FlatList
                data={items}
                renderItem={({ item }) => item ? <TodoItem item={item} /> : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerView: {
        color: 'black',
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 80,
        height: 820,
    },
    inputContainer: {
        flexDirection: "row",
        width: 300,
        justifyContent: "space-evenly",
        marginBottom: 100
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        textAlign: "center",
        borderColor: 'black'
    },
    addItemBtn: {
        color: 'white',
        backgroundColor: 'orange'
    },
    todoItem: {
        color: 'black',
        flexDirection: "row",
        height: 32,
        width: 300,
        marginTop: 8,
        alignItems: "center"
    }
});