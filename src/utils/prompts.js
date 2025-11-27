// src/utils/prompts.js

export const ULTRA_PRO_NANO_PROMPT = (uploadedImageContext = "this interior space") => {
    return `
// PROMPT MODE: ARCHITECTURAL REMIX & PROFESSIONAL VISUALIZATION (Vahini AI Pro-Level)
// INSTRUCTION: Use the uploaded image (${uploadedImageContext}) as the primary reference for the room's composition, lighting, and general size/shape.
// TASK: Re-imagine this interior as a 4K, photo-realistic luxury visualization using the 'Nano Banana Pro' image model.
// DESIGN CONSTRAINTS:
// 1. STYLE: Hyper-modern, minimalist Scandi-Luxury (Clean lines, light wood, ample natural light).
// 2. KEY ACCENT: All metallic elements (trim, fixtures, furniture legs) must use a rich, custom color: **"Nano Banana Pro Metallic Gold"** (a highly polished, muted champagne gold).
// 3. TEXTURE: Highly detailed textures for wood grain, soft velvet fabrics, and polished marble or concrete surfaces.
// 4. PHOTOGRAPHY: Use a wide-angle lens, low-angle shot, with dramatic, cinematic backlighting to emphasize depth.
// 5. FINAL ACTION: Apply this design to the uploaded image's context. Do not change the original photo; generate the new, redesigned visualization.
    `.trim();
};
