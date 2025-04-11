## MongoDB Aggregation Questions & Answers

### 🟢 Basic Level

#### List all employees

```js
db.employees.find();
```

#### Find all employees in the "Engineering" department

```js
db.employees.find({ department: 'Engineering' });
```

#### Find all employees older than 30

```js
db.employees.find({ age: { $gt: 30 } });
```

#### Get all departments and their managers

```js
db.departments.find({}, { name: 1, managerId: 1, _id: 0 });
```

#### Find a single employee with the highest salary

```js
db.employees.find().sort({ salary: -1 }).limit(1);
```

#### Count how many employees are in each department

```js
db.employees.aggregate([
    { $group: { _id: '$department', count: { $sum: 1 } } },
    { $project: { department: '$_id', count: 1, _id: 0 } },
]);
```

---

### 🟡 Intermediate Level

#### Sort employees by age in descending order

```js
db.employees.find().sort({ age: -1 });
```

#### Get all sales records with an amount greater than $5,000

```js
db.sales.find({ amount: { $gt: 5000 } });
```

#### Join employees with their department info

```js
db.employees.aggregate([
    {
        $lookup: {
            from: 'departments',
            localField: 'department',
            foreignField: 'name',
            as: 'department_info',
        },
    },
]);
```

#### Find total salary cost per department

```js
db.employees.aggregate([
    { $group: { _id: '$department', totalSalary: { $sum: '$salary' } } },
]);
```

#### List employees whose salary is between $60,000 and $80,000

```js
db.employees.find({ salary: { $gte: 60000, $lte: 80000 } });
```

#### Find average age of employees in each department

```js
db.employees.aggregate([
    { $group: { _id: '$department', avgAge: { $avg: '$age' } } },
]);
```

#### Find total sales made by each employee

```js
db.sales.aggregate([
    { $group: { _id: '$sales_by', totalSales: { $sum: '$amount' } } },
]);
```

#### Find top 3 employees by total sales

```js
db.sales.aggregate([
    { $group: { _id: '$sales_by', totalSales: { $sum: '$amount' } } },
    { $sort: { totalSales: -1 } },
    { $limit: 3 },
]);
```

#### Get employees who haven’t made any sales

```js
db.employees.aggregate([
    {
        $lookup: {
            from: 'sales',
            localField: 'first_name',
            foreignField: 'sales_by',
            as: 'sales',
        },
    },
    { $match: { sales: { $eq: [] } } },
]);
```

---

### 🔴 Advanced Level

#### List departments that have more than 3 employees

```js
db.employees.aggregate([
    { $group: { _id: '$department', employeeCount: { $sum: 1 } } },
    { $match: { employeeCount: { $gt: 3 } } },
]);
```

#### Find departments where the manager is not listed as an employee

```js
db.departments.aggregate([
    {
        $lookup: {
            from: 'employees',
            localField: 'managerId',
            foreignField: '_id',
            as: 'manager',
        },
    },
    { $match: { manager: { $eq: [] } } },
]);
```

#### For each department, list the manager’s name and total employees

```js
db.departments.aggregate([
    {
        $lookup: {
            from: 'employees',
            localField: 'managerId',
            foreignField: '_id',
            as: 'manager',
        },
    },
    {
        $lookup: {
            from: 'employees',
            localField: 'name',
            foreignField: 'department',
            as: 'employees',
        },
    },
    {
        $project: {
            department: '$name',
            managerName: { $arrayElemAt: ['$manager.first_name', 0] },
            totalEmployees: { $size: '$employees' },
        },
    },
]);
```

#### Find which employee made the highest individual sale

```js
db.sales.find().sort({ amount: -1 }).limit(1);
```

#### Create a report combining employee, department, and sales data in one aggregated view

```js
db.employees.aggregate([
    {
        $lookup: {
            from: 'departments',
            localField: 'department',
            foreignField: 'name',
            as: 'department_info',
        },
    },
    {
        $lookup: {
            from: 'sales',
            localField: 'first_name',
            foreignField: 'sales_by',
            as: 'sales_info',
        },
    },
    {
        $project: {
            first_name: 1,
            last_name: 1,
            department: 1,
            manager: { $arrayElemAt: ['$department_info.managerId', 0] },
            totalSales: { $sum: '$sales_info.amount' },
        },
    },
]);
```

#### Identify departments with average salary > $70,000

```js
db.employees.aggregate([
    { $group: { _id: '$department', avgSalary: { $avg: '$salary' } } },
    { $match: { avgSalary: { $gt: 70000 } } },
]);
```

#### Get sales grouped by employee and month (assume createdAt date is added in sales)

```js
db.sales.aggregate([
    {
        $group: {
            _id: {
                sales_by: '$sales_by',
                month: { $month: '$createdAt' },
                year: { $year: '$createdAt' },
            },
            totalSales: { $sum: '$amount' },
        },
    },
]);
```

#### Add a new field to each employee called experienceLevel based on age

```js
db.employees.aggregate([
    {
        $addFields: {
            experienceLevel: {
                $switch: {
                    branches: [
                        { case: { $lt: ['$age', 30] }, then: 'Junior' },
                        { case: { $lte: ['$age', 40] }, then: 'Mid' },
                    ],
                    default: 'Senior',
                },
            },
        },
    },
]);
```

#### Remove all sales below $500

```js
db.sales.deleteMany({ amount: { $lt: 500 } });
```

#### Create a view of top-performing departments based on total sales

```js
db.sales.aggregate([
    {
        $lookup: {
            from: 'employees',
            localField: 'sales_by',
            foreignField: 'first_name',
            as: 'employee',
        },
    },
    { $unwind: '$employee' },
    {
        $group: {
            _id: '$employee.department',
            totalSales: { $sum: '$amount' },
        },
    },
    { $sort: { totalSales: -1 } },
    { $project: { department: '$_id', totalSales: 1, _id: 0 } },
]);
```

---
