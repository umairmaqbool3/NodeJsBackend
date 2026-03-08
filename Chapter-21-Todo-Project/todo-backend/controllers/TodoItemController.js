exports.createTodoItem = (req, res) => {
    const { title, description } = req.body;

    // Here you would typically save the todo item to a database
    // For this example, we'll just return the created item

    const newTodoItem = {
        id: Date.now(), // Just a simple unique ID for demonstration
        title,
        description,
        completed: false
    };

    res.status(201).json(newTodoItem);
};