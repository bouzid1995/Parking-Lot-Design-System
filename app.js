const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// just to test your API
app.get("/", async (req, res, next) => {
  res.send({ message: "API is working 🚀" });
});

// Import all routes
const slotRoutes = require("./app/routes/slot.routes");
// const storeRoute = require('./app/routes/store.routes');
// const roleRoute = require('./app/routes/role.routes');
// const machineRoute = require('./app/routes/machine.routes');
// const sectionRoute = require('./app/routes/section.routes');
// const workshopRoute = require('./app/routes/workshop.routes');
// const userRoute = require('./app/routes/user.routes');
// const orderTypeRoute = require('./app/routes/orderType.routes');
// const productCompRoute = require('./app/routes/prodComp.routes');
// const authRoute = require('./app/routes/auth.routes');
// const productRoute = require('./app/routes/product.routes');
// setup app to use all routes
app.use("/api/slot", slotRoutes);
// app.use('/api/store', storeRoute);
// app.use('/api/role', roleRoute);
// app.use('/api/machine', machineRoute);
// app.use('/api/section', sectionRoute);
// app.use('/api/workshop', workshopRoute);
// app.use('/api/user', userRoute);
// app.use('/api/ordertype', orderTypeRoute);
// app.use('/api/prodcomp', productCompRoute);
// app.use('/api/login', authRoute);
// app.use('/api/product', productRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
