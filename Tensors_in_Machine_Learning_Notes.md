# 🧠 Tensors in Machine Learning — Visual Notes

> **Source:** [What are Tensors | Tensor In-depth Explanation](https://www.youtube.com/watch?v=vVhD2EyS41Y)  
> **Playlist:** Machine Learning Series — Video #15

---

## 📊 1. The Tensor Hierarchy — From Scalar to nD Tensor

![Tensor Hierarchy — Scalar → Vector → Matrix → 3D Tensor → nD Tensor](./tensor_hierarchy.png)

### 🔑 Core Concept
> A **tensor** is simply a **generalization of numbers, arrays, and grids to any number of dimensions**.

| Type | Rank | Axes | What It Looks Like | Example |
|------|------|------|--------------------|---------|
| **Scalar** | 0 | 0 | A single number: `5` | Loss value, learning rate |
| **Vector** | 1 | 1 | A 1D array: `[1, 2, 3]` | Feature vector, word embedding |
| **Matrix** | 2 | 2 | A 2D grid of numbers | Grayscale image, weight matrix |
| **3D Tensor** | 3 | 3 | A cube of numbers | Color image (H × W × C) |
| **nD Tensor** | n | n | Nested multidimensional array | Video batches, sequence data |

**💡 Key Insight:** Everything in deep learning — inputs, outputs, weights, gradients — is stored as a tensor. Think of tensors as **containers that hold numerical data** in any number of dimensions.

---

## 🔍 2. Scalars, Vectors & Matrices — The Building Blocks

![Scalars vs Vectors vs Matrices — side by side comparison](./scalar_vector_matrix.png)

### Scalar (Rank 0) — A Single Point
- **No axes**, just one number
- **Examples:** `loss = 0.05`, `accuracy = 0.92`, `temperature = 37.5`
- In code: `x = 5` (just a number)

### Vector (Rank 1) — A Line of Numbers
- **One axis** (length)
- Represents **magnitude + direction** in a space
- **Examples:**
  - Feature vector of a house: `[area, bedrooms, price]` → `[1200, 3, 250000]`
  - Word embedding: a 300-dimensional vector that captures meaning
- In code: `v = [3, 7, 1, 9, 2]`

### Matrix (Rank 2) — A Grid of Numbers
- **Two axes** (rows × columns)
- **Examples:**
  - A 28×28 grayscale image (like MNIST digits)
  - Weight matrix connecting two neural network layers
  - A dataset table (rows = samples, columns = features)
- In code: `M = [[1,2,3], [4,5,6], [7,8,9]]`

**💡 Memory Trick:** *Rank = Number of indices needed to access a single element*
- Scalar: `x` (no index)
- Vector: `v[i]` (one index)
- Matrix: `M[i][j]` (two indices)
- 3D Tensor: `T[i][j][k]` (three indices)

---

## 🖼️ 3. Tensors in Real-World ML Applications

![Real-World Tensor Applications — Images, Batches, Videos](./tensor_applications.png)

### How Real Data Maps to Tensor Ranks:

| Data Type | Tensor Rank | Shape Example | Explanation |
|-----------|-------------|---------------|-------------|
| **Single number** (loss) | 0D | `()` | Just a value |
| **Audio signal** | 1D | `(44100,)` | Amplitude samples over time |
| **Grayscale image** | 2D | `(28, 28)` | Height × Width pixels |
| **Color image** | 3D | `(224, 224, 3)` | Height × Width × RGB channels |
| **Batch of color images** | 4D | `(32, 224, 224, 3)` | Batch × H × W × C |
| **Video** | 5D | `(8, 30, 224, 224, 3)` | Batch × Frames × H × W × C |

**💡 Key Insight:** The reason ML frameworks like **TensorFlow** and **PyTorch** are named after tensors is because *all data flows through neural networks as tensors*. Even a single text sentence gets converted to a tensor of numbers before the model can process it.

---

## ⚡ 4. Tensor Operations in Neural Networks

![Tensor Operations in Neural Networks](./tensor_operations.png)

### The 6 Most Important Tensor Operations:

1. **Matrix Multiplication (Dot Product)** → The backbone of neural networks
   - `Output = Input × Weights + Bias`
   - Every layer in a neural network performs this operation

2. **Element-wise Operations** → Apply operation to every element
   - Addition: `A + B` (add corresponding elements)
   - ReLU activation: `max(0, x)` applied to every element

3. **Reshape / Flatten** → Change the shape without changing data
   - Flatten a 28×28 image into a 784-length vector for a fully-connected layer
   - Reshape `(2, 6)` → `(3, 4)` → same 12 numbers, different arrangement

4. **Transpose** → Swap axes (rows ↔ columns)
   - Required for matrix multiplication dimension compatibility

5. **Broadcasting** → Automatically expand smaller tensor to match larger one
   - Add a bias vector `(3,)` to a matrix `(5, 3)` → bias gets applied to each row

6. **Slicing / Indexing** → Extract sub-tensors
   - Get the red channel from an RGB image: `image[:, :, 0]`

**💡 Key Insight:** Neural networks are essentially **a chain of tensor operations**. Training = finding the right tensor values (weights) to minimize the loss tensor.

---

## 🧩 5. Tensor Properties & Key Concepts

![Tensor Properties and Key Concepts Map](./tensor_properties.png)

### Every Tensor Has These Properties:

| Property | Description | Example |
|----------|-------------|---------|
| **Rank (ndim)** | Number of dimensions/axes | Matrix → rank 2 |
| **Shape** | Size along each dimension | `(3, 4, 5)` — 3 layers, 4 rows, 5 cols |
| **Dtype** | Data type of elements | `float32`, `int64`, `bool` |
| **Device** | Where it's stored | CPU or GPU (CUDA) |
| **Size** | Total number of elements | Shape `(3,4,5)` → 60 elements |

### Why GPU Matters for Tensors:
- Tensors can be moved to **GPU** for **parallel computation**
- A GPU can process thousands of tensor elements simultaneously
- This is why deep learning needs powerful GPUs

---

## 🎯 6. Quick Revision Cheatsheet

```
TENSOR = Multidimensional container of numbers

Rank 0 → Scalar     → 5              → single value
Rank 1 → Vector     → [1, 2, 3]      → list/array
Rank 2 → Matrix     → [[1,2],[3,4]]  → table/grid
Rank 3 → 3D Tensor  → [[[...]]]      → cube (e.g., color image)
Rank n → nD Tensor  → nested arrays   → any complex data

SHAPE tells you → how many elements along EACH axis
RANK tells you  → HOW MANY axes there are
DTYPE tells you → what TYPE of numbers (int, float, etc.)
```

### 🧠 Analogy to Remember:
| Tensor Concept | Real-World Analogy |
|---|---|
| **Scalar** | A single thermometer reading |
| **Vector** | A playlist of songs (ordered list) |
| **Matrix** | A spreadsheet (rows & columns) |
| **3D Tensor** | A stack of spreadsheets (like an Excel workbook) |
| **4D Tensor** | A shelf of workbooks |
| **5D Tensor** | A room full of shelves of workbooks |

---

## ⚠️ Common Confusions Clarified

1. **"Dimension" is overloaded** — In ML, "dimension" can mean:
   - The *rank* of a tensor (number of axes)
   - The *size* along a particular axis
   - Always check context!

2. **Tensors ≠ just NumPy arrays** — While numpy arrays ARE tensors, framework tensors (PyTorch/TensorFlow) support:
   - GPU acceleration
   - Automatic differentiation (autograd)
   - Computational graph tracking

3. **Shape mismatch = most common bug** — When you see `RuntimeError: shape mismatch`, it means your tensor dimensions don't align for the operation you're trying to do.

---

> **📌 Bottom Line:** If you understand tensors, you understand 80% of how data flows through any ML model. Everything is a tensor — your data, your weights, your gradients, your predictions. Master the shapes and operations, and the rest of ML becomes much clearer.
