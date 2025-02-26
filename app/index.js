import React, { useReducer, useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), title: action.title }];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};
export default function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTask, setNewTask] = useState("");

  const handleAddTodo = () => {
    if (newTask.trim()) {
      dispatch({ type: "ADD_TODO", title: newTask });
      setNewTask(""); 
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch({ type: "REMOVE_TODO", id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        placeholder="Add..."
        style={styles.input}
      />
      <Button title= "Save" color="#FF7043" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.todoItem} onPress={() => handleRemoveTodo(item.id)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "#FFCDD2",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    color:"#FF7043",
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFCDD2",
    marginVertical: 5,
  },
});
