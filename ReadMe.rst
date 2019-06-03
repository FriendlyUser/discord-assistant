Discord Personal Assistance Bot
===============================


* Discord Bot
* TODO LIST API


.. code-block:: javascript

    // adding new task to list of tasks
    mutation {
        addTasks(name: "finish koa mongo", start_date: "2019-06-02", end_date: "2019-06-03", category: "discord", priority: "high") {
            name,
            start_date,
            end_date,
            category,
            priority
        }
    }


    // when error, data returned is null
    mutation {
        updateTask(
            id: "5cf359f4e7179a0a437eb34c", name: "finish koa mongo part 2", start_date: "2019-06-03"
            , end_date: "2019-06-04", category: "graphql", priority: "high") {
        name,
        start_date
        end_date,
        category,
        priority
        }
    }