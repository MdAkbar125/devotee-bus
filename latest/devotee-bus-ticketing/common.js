/* common.js - LocalStorage based ticket management and utilities */

// Utility function to generate unique ID (simple random string)
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Utility function to get current timestamp string
function getCurrentTimestamp() {
  return new Date().toISOString();
}

// Utility function to check booking time limit (3:30 AM to 9:30 PM)
function isBookingAllowed() {
  const now = new Date();
  const start = new Date();
  start.setHours(3, 30, 0, 0);
  const end = new Date();
  end.setHours(21, 30, 0, 0);
  return now >= start && now <= end;
}

// Voice guidance function using SpeechSynthesis API
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
}

// LocalStorage key for tickets
const TICKETS_KEY = 'devoteeBusTickets';

// Get all tickets from localStorage
function getAllTickets() {
  const ticketsJson = localStorage.getItem(TICKETS_KEY);
  return ticketsJson ? JSON.parse(ticketsJson) : [];
}

// Save all tickets to localStorage
function saveAllTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

// Add a new ticket, returns the ticket id
function addTicket(ticket) {
  const tickets = getAllTickets();
  const id = generateId();
  ticket.id = id;
  tickets.push(ticket);
  saveAllTickets(tickets);
  return id;
}

// Get ticket by id
function getTicketById(id) {
  const tickets = getAllTickets();
  return tickets.find(t => t.id === id);
}

// Update ticket scansUsed by id
function updateTicketScansUsed(id, newScansUsed) {
  const tickets = getAllTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index !== -1) {
    tickets[index].scansUsed = newScansUsed;
    saveAllTickets(tickets);
    return true;
  }
  return false;
}

// Reset all scansUsed to 0
function resetAllScans() {
  const tickets = getAllTickets();
  tickets.forEach(t => {
    t.scansUsed = 0;
  });
  saveAllTickets(tickets);
}

// Reset all tickets by clearing the tickets array
function resetAllTickets() {
  saveAllTickets([]);
}
