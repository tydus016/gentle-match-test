// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { filter } from "lodash";

// Create a slice
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const qtyControlSlice = createSlice({
  name: "qtyControl",
  initialState: { value: 1 },
  reducers: {
    setAddQty: (state) => {
      state.value += 1;
    },
    setRemoveQty: (state) => {
      state.value -= 1;
    },
    setQtyAmount: (state, action) => {
      state.value = action.payload;
    },
    resetQty: (state) => {
      state.value = 1;
    },
  },
});

const itemVariantsSlice = createSlice({
  name: "itemVariants",
  initialState: { value: {} },
  reducers: {
    setVariant: (state, action) => {
      state.value = action.payload;
    },
    resetVariant: (state) => {
      state.value = {};
    },
  },
});

const itemSizesSlice = createSlice({
  name: "itemSizes",
  initialState: { value: {} },
  reducers: {
    setSize: (state, action) => {
      state.value = action.payload;
    },
    resetSize: (state) => {
      state.value = {};
    },
  },
});

const orderItemsSlice = createSlice({
  name: "orderItems",
  initialState: { value: [] },
  reducers: {
    addOrderItem: (state, action) => {
      state.value.push(action.payload);
    },
    removeOrderItem: (state, action) => {
      return state.value.filter((item) => item.id !== action.payload);
    },
    removeOrderItemByIndex: (state, action) => {
      state.value = state.value.filter(
        (item, index) => index !== action.payload
      );
    },
    clearOrderItems: (state) => {
      state.value = [];
    },
  },
});

const selectedItem = createSlice({
  name: "selectedItem",
  initialState: { value: null },
  reducers: {
    setSelectedItem: (state, action) => {
      state.value = action.payload;
    },
    resetSelectedItem: (state) => {
      state.value = null;
    },
  },
});

const orderSummary = createSlice({
  name: "orderSummary",
  initialState: { value: { discount: 5, tax: 1.55, subtotal: 0, total: 0 } },
  reducers: {
    setDiscount: (state, action) => {
      state.value.discount = action.payload;
    },
    setTax: (state, action) => {
      state.value.tax = action.payload;
    },
    setSubtotal: (state, action) => {
      state.value.subtotal = action.payload;
    },
    setTotal: (state, action) => {
      state.value.total = action.payload;
    },
    setAmountPayable: (state) => {
      const { discount, tax, subtotal } = state.value;
      const total =
        parseFloat(subtotal) + parseFloat(tax) - parseFloat(discount);
      state.value.total = total.toFixed(2);
    },
    resetSummary: (state) => {
      state.value = { discount: 0, tax: 0, subtotal: 0, total: 0 };
    },
    resetTotal: (state) => {
      state.value.total = 0;
    },
  },
});

// - flag if the select item is being edited
const isEditing = createSlice({
  name: "isEditing",
  initialState: { value: false },
  reducers: {
    setIsEditing: (state, action) => {
      state.value = action.payload;
    },
  },
});

const tabToggle = createSlice({
  name: "tabToggle",
  initialState: { value: { current: null, prev: null } },
  reducers: {
    setTab: (state, action) => {
      state.value.prev = state.value.current;
      state.value.current = action.payload;
    },
    resetTab: (state) => {
      state.value.current = null;
      state.value.prev = null;
    },
  },
});

// Export actions for use in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { setAddQty, setRemoveQty, resetQty, setQtyAmount } =
  qtyControlSlice.actions;
export const {
  addOrderItem,
  removeOrderItem,
  removeOrderItemByIndex,
  clearOrderItems,
} = orderItemsSlice.actions;
export const { setVariant, resetVariant } = itemVariantsSlice.actions;
export const { setSize, resetSize } = itemSizesSlice.actions;
export const { setSelectedItem, resetSelectedItem } = selectedItem.actions;
export const {
  setDiscount,
  setTax,
  setSubtotal,
  setTotal,
  resetSummary,
  resetTotal,
  setAmountPayable,
} = orderSummary.actions;
export const { setIsEditing } = isEditing.actions;
export const { setTab, resetTab } = tabToggle.actions;

// Create the store and add the counter slice
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    qtyControl: qtyControlSlice.reducer,
    orderItems: orderItemsSlice.reducer,
    itemVariants: itemVariantsSlice.reducer,
    itemSizes: itemSizesSlice.reducer,
    selectedItem: selectedItem.reducer,
    orderSummary: orderSummary.reducer,
    isEditing: isEditing.reducer,
    tabToggle: tabToggle.reducer,
  },
});

export default store;
