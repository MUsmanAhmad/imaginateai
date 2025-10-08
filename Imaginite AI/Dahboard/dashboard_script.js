document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const generateBtn = document.getElementById('generate-btn');
  const promptInput = document.getElementById('prompt');
  const sizeSelect = document.getElementById('size');
  const modelSelect = document.getElementById('model-select');
  const negativePromptInput = document.getElementById('negative-prompt');
  const imagePlaceholder = document.getElementById('image-placeholder');
  const generatedImage = document.getElementById('generated-image');
  const spinner = document.getElementById('spinner');
  const statusMessage = document.getElementById('status-message');
  const downloadBtn = document.getElementById('download-btn');

  let isGenerating = false;

  // Presets
  const layoutInfo = {
    landscape: "panoramic view, wide angle shot",
    portrait: "portrait framing, centered subject, vertical layout",
    square: "square frame, centered composition",
    cinematic: "cinematic aspect ratio, dramatic lighting, film still",
    closeup: "close-up view, head and shoulders, detailed face"
  };

  const stylePresets = {
    realistic: "highly detailed, 8k, realistic lighting",
    anime: "anime style, colorful hair, cel shading, big eyes",
    cartoon: "cartoon drawing, thick outlines, playful design",
    portrait: "professional portrait, bokeh, shallow depth of field",
    graphic: "graphic design, minimal vector art, bold colors"
  };

  // Main handler
  generateBtn.addEventListener('click', handleGenerate);

  async function handleGenerate() {
    if (isGenerating) return;

    const basePrompt = promptInput.value.trim();
    if (!basePrompt) {
      showStatus('Please enter a prompt', 'error');
      return;
    }

    resetUI();
    showStatus('Generating image...', 'info');
    showSpinner(true);
    isGenerating = true;
    generateBtn.disabled = true;

    const start = Date.now();

    try {
      const finalPrompt = buildPrompt(basePrompt);
      await generateImage(finalPrompt);
      const duration = (Date.now() - start) / 1000;
      showStatus(`✅ Image generated in ${duration.toFixed(1)}s`, 'success');
    } catch (err) {
      showStatus(err.message, 'error');
    } finally {
      isGenerating = false;
      generateBtn.disabled = false;
      showSpinner(false);
    }
  }

  // Build the full prompt with style + layout
  function buildPrompt(basePrompt) {
    const selectedStyle = modelSelect.value;
    const selectedLayout = sizeSelect.value;

    let prompt = basePrompt;

    if (stylePresets[selectedStyle]) {
      prompt += `, ${stylePresets[selectedStyle]}`;
    }

    if (layoutInfo[selectedLayout]) {
      prompt += `, ${layoutInfo[selectedLayout]}`;
    }

    return prompt;
  }

// Generate image using Together AI API
async function generateImage(prompt) {
  const togetherAPI = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell-Free";
  const togetherToken = "9ca4d291e6062bb3b358291dbf0d4ae21966af3a4ad12a88f2b91ad2ed347323"; // ← replace this!

  const width = 1280;
  const height = 720;

  const response = await fetch(togetherAPI, {
    method: "POST",
    headers: {
      Authorization: "Bearer 9ca4d291e6062bb3b358291dbf0d4ae21966af3a4ad12a88f2b91ad2ed347323",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "black-forest-labs/FLUX.1-dev",
      prompt: prompt,
      negative_prompt: negativePromptInput.value || undefined,
      width: width,
      height: height
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error("❌ Image generation failed: " + errorText);
  }

  const data = await response.json();
  const imageUrl = data.output?.[0];

  if (!imageUrl || !imageUrl.startsWith("http")) {
    throw new Error("❌ No image returned from Together AI.");
  }

  generatedImage.src = imageUrl;
  generatedImage.style.display = 'block';
  imagePlaceholder.style.display = 'none';

  downloadBtn.href = imageUrl;
  downloadBtn.download = 'imaginite-image.png';
  downloadBtn.style.display = 'inline-block';
  downloadBtn.onclick = () => window.open(imageUrl, '_blank');
}

  // UI helpers
  function showSpinner(show) {
    spinner.style.display = show ? 'block' : 'none';
  }

  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`;
    statusMessage.style.display = 'block';
  }

  function resetUI() {
    statusMessage.style.display = 'none';
    imagePlaceholder.style.display = 'none';
    generatedImage.style.display = 'none';
    downloadBtn.style.display = 'none';
  }
});


