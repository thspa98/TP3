# Asistente Virtual de Agendamiento con IA 🤖📅

Este proyecto es una aplicación web que integra un chatbot inteligente capaz de interactuar con los usuarios, consultar disponibilidad y agendar turnos automáticamente utilizando Inteligencia Artificial.

## 🛠️ Arquitectura y Tecnologías
*   **Frontend:** HTML, CSS y JavaScript (Desplegado en Vercel).
*   **Automatización y Lógica:** Make (Integromat).
*   **Inteligencia Artificial:** Google Gemini 2.5 Flash.
*   **Base de Datos:** Supabase (PostgreSQL).
*   **Calendario:** Google Calendar API.

## ⚙️ Cómo funciona el flujo
1. El usuario envía un mensaje desde la interfaz web (Vercel).
2. El mensaje es capturado por un Webhook en Make.
3. Make consulta la intención del usuario a través de Gemini y bifurca el camino (Router).
4. Si el usuario busca horarios, Make lee los eventos ocupados en Google Calendar, Gemini redacta la disponibilidad y se envía la respuesta al frontend.
5. Si el usuario quiere agendar, Make procesa la fecha/hora y el servicio, guarda el registro en la tabla de Supabase, crea el evento oficial en Google Calendar y devuelve la confirmación en texto al usuario.
