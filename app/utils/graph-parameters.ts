import { CharacterInteractions } from "../types/model";

export const updateNodeCanvasObject = (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
  const label = node.id;
  const fontSize = 12 / globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, bckgDimensions[0], bckgDimensions[1]);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255)';
  ctx.fillText(label, node.x, node.y);

  node.__bckgDimensions = bckgDimensions;
}

export const updateLinkCanvasObject = (link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
  const label = String(link.value) || '';
  const start = link.source;
  const end = link.target;

  if (typeof start !== 'object' || typeof end !== 'object') return;

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  const fontSize = 12 / globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const padding = 4;
  const labelBgWidth = textWidth + padding;
  const labelBgHeight = fontSize + padding;

  // calculate the direction vector from source to target
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  const offset = labelBgWidth / 2;
  const offsetX = (dx / len) * offset;
  const offsetY = (dy / len) * offset;

  // draw first segment of the line
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(midX - offsetX, midY - offsetY);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 0.1;
  ctx.stroke();

  // draw second segment of the line
  ctx.beginPath();
  ctx.moveTo(midX + offsetX, midY + offsetY);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  // draw label background (optional for readability)
  ctx.fillStyle = 'black';
  ctx.fillRect(midX - labelBgWidth / 2, midY - labelBgHeight / 2, labelBgWidth, labelBgHeight);

  // draw the label
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, midX, midY);
}

export const buildLinkLabel = (link: any) => link.value + " interactions between " + link.source.id + " and " + link.target.id

export const buildGraphData = (data: CharacterInteractions) => {
  const character_names: Set<string> = new Set();
  const links: { source: string; target: string, value: number }[] = [];

  data.character_interactions.forEach((char) => {
    character_names.add(char.character_name);
    char.interacted_with.forEach((target) => {
      character_names.add(target.name);
      links.push({
        source: char.character_name,
        target: target.name,
        value: target.count
      });
    });
  });

  const nodes: { id: string }[] = Array.from(character_names).map(id => ({ id }));
  return { nodes: nodes, links: links };
}