import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchParagraphs = createAsyncThunk(
  "text/fetchParagraphs",
  async ({ count, format }) => {
    const response = await fetch(
      `https://baconipsum.com/api/?type=all-meat&paras=${count}&format=${format}`
    );

    const data = await response.text();
    if (format === "html") {
      return data
        .split("<p>")
        .map((p) => p.replace("</p>", "").trim())
        .filter((p) => p);
    } else {
      return data.split("\n").filter((p) => p);
    }
  }
);

const textSlice = createSlice({
  name: "text",
  initialState: {
    paragraphs: [],
    status: "idle",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchParagraphs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.paragraphs = action.payload; // Gelen veriyi state'e kaydediyoruz
      })
      .addCase(fetchParagraphs.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default textSlice.reducer;
