const form = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const resultBox = document.getElementById("resultBox");

imageInput.addEventListener("change", function () {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = imageInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  resultBox.innerText = "Analyzing...";

  try {
    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    resultBox.innerText = data.result || "Analysis failed.";
  } catch (error) {
    console.error("Error:", error);
    resultBox.innerText = "Server error.";
  }
});