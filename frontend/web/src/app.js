// frontend/web/src/app.js

import { logoutUser, listReports, createReport } from './api.js';

// Variáveis globais para o mapa e marcadores
let map, markerGroup;

// ----------------------------------------------------
// 1. Funções Globais (Acessíveis pelo HTML)
// ----------------------------------------------------

window.logoutUser = logoutUser; // Torna a função de API acessível globalmente

window.getGeolocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitudeInput = document.getElementById('latitude');
            const longitudeInput = document.getElementById('longitude');
            
            latitudeInput.value = position.coords.latitude;
            longitudeInput.value = position.coords.longitude;
            
            // Centralizar o mapa na localização atual
            if (map) {
                map.setView([position.coords.latitude, position.coords.longitude], 15);
            }
        }, () => {
            alert('Não foi possível obter a sua localização. Verifique as permissões.');
        });
    } else {
        alert('Seu navegador não suporta geolocalização.');
    }
}

// ----------------------------------------------------
// 2. Inicialização e Carregamento de Dados
// ----------------------------------------------------

export function initializeReportsPage() {
    checkAuth();
    setupEventListeners();
}

function checkAuth() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        window.location.href = 'index.html'; 
        return;
    }
    document.getElementById('userName').textContent = localStorage.getItem('userName') || 'Cidadão';
    initializeMap();
}

function initializeMap() {
    // [ADICIONAR O Leaflet aqui, garantindo que ele foi carregado no HTML]
    map = L.map('map').setView([-3.7319, -38.5267], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    markerGroup = L.layerGroup().addTo(map);
    loadReports();
}

async function loadReports() {
    try {
        const reports = await listReports(); 
        markerGroup.clearLayers();
        
        reports.forEach(report => {
            const marker = L.marker([report.latitude, report.longitude]);
            marker.bindPopup(`<b>${report.title}</b><br>Status: ${report.status}`);
            markerGroup.addLayer(marker);
        });

    } catch (error) {
        console.error('Erro ao carregar denúncias:', error);
    }
}

// ----------------------------------------------------
// 3. Manipulação do Formulário
// ----------------------------------------------------

function setupEventListeners() {
    document.getElementById('reportForm').addEventListener('submit', handleReportSubmission);
}

async function handleReportSubmission(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const reportData = {
        title: form.reportTitle.value,
        description: form.reportDescription.value,
        latitude: parseFloat(form.latitude.value),
        longitude: parseFloat(form.longitude.value),
        photo_url: form.photoUrl.value,
    };
    
    const alertDiv = document.getElementById('reportAlert');
    alertDiv.className = 'alert d-none mt-3';

    try {
        await createReport(reportData); 
        alertDiv.className = 'alert alert-success mt-3';
        alertDiv.textContent = 'Denúncia registrada com sucesso! Recarregando mapa...';
        
        loadReports();
        form.reset(); 

    } catch (error) {
        alertDiv.className = 'alert alert-danger mt-3';
        alertDiv.textContent = error.message || 'Falha ao registrar a denúncia.';
    }
}