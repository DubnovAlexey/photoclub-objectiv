/**
 * tools/generate-space-audio.js
 * Второй фоновый трек — "космический" эмбиент для секции «Фотоохота по Вселенной»:
 * открытый пэд A2/E3/A3/C#4 с медленным «дыханием» громкости. Частоты подобраны
 * так, чтобы 4 секунды содержали целое число периодов каждого тона и биения
 * громкости — петля склеивается без щелчка. Чистый Node.js, без npm-пакетов.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SAMPLE_RATE = 16000;
const DURATION_SEC = 4.0;

function buildSamples() {
  const total = Math.round(SAMPLE_RATE * DURATION_SEC);
  const samples = new Int16Array(total);
  const tones = [
    { freq: 110,   amp: 0.34 }, // A2
    { freq: 164.5, amp: 0.22 }, // ~E3
    { freq: 220,   amp: 0.20 }, // A3
    { freq: 277,   amp: 0.14 }, // ~C#4
  ];

  for (let i = 0; i < total; i++) {
    const t = i / SAMPLE_RATE;
    let value = 0;
    for (const { freq, amp } of tones) value += amp * Math.sin(2 * Math.PI * freq * t);
    const breathe = 0.75 + 0.25 * Math.sin(2 * Math.PI * 0.5 * t); // 2 цикла за 4с — целое число
    value *= breathe * 0.3;
    value = Math.max(-1, Math.min(1, value));
    samples[i] = Math.round(value * 32767);
  }
  return samples;
}

function encodeWav(samples) {
  const blockAlign = 2, byteRate = SAMPLE_RATE * blockAlign, dataSize = samples.length * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0, 'ascii'); buffer.writeUInt32LE(36 + dataSize, 4); buffer.write('WAVE', 8, 'ascii');
  buffer.write('fmt ', 12, 'ascii'); buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22); buffer.writeUInt32LE(SAMPLE_RATE, 24); buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32); buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36, 'ascii'); buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) buffer.writeInt16LE(samples[i], 44 + i * 2);
  return buffer;
}

const wavBuffer = encodeWav(buildSamples());
const outDir = path.join(__dirname, '..', 'assets', 'audio');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'space-ambient.wav'), wavBuffer);
console.log('Готово:', path.join(outDir, 'space-ambient.wav'), wavBuffer.length, 'байт');
