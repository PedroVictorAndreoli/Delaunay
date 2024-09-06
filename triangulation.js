// triangulation.js

// Função para gerar pontos aleatórios
function generateRandomPoints(numPoints, width, height) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push([Math.random() * width, Math.random() * height]);
    }
    return points;
}

// Função para renderizar o SVG
function renderSVG(points, triangles) {
    const svg = document.getElementById('svgCanvas');
    svg.innerHTML = ''; // Limpa o SVG
    
    // Adiciona os pontos
    points.forEach(([x, y]) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', 3);
        circle.setAttribute('class', 'point');
        svg.appendChild(circle);
    });

    // Adiciona os triângulos
    triangles.forEach(([a, b, c]) => {
        const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        triangle.setAttribute('points', `${a[0]},${a[1]} ${b[0]},${b[1]} ${c[0]},${c[1]}`);
        triangle.setAttribute('class', 'triangle');
        svg.appendChild(triangle);
    });
}

// Função principal
function main() {
    const width = 800;
    const height = 600;
    const numPoints = 30;
    
    // Gera pontos aleatórios
    const points = generateRandomPoints(numPoints, width, height);
    
    // Cria a triangulação de Delaunay
    const delaunay = d3.Delaunay.from(points);
    const triangles = delaunay.triangles; // Triângulos indexados

    // Converte índices para pontos
    const trianglePoints = [];
    for (let i = 0; i < triangles.length; i += 3) {
        const a = points[triangles[i]];
        const b = points[triangles[i + 1]];
        const c = points[triangles[i + 2]];
        trianglePoints.push([a, b, c]);
    }

    // Renderiza no SVG
    renderSVG(points, trianglePoints);
}

// Executa a função principal quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', main);
