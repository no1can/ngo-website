/**
 * teamStore.js — Central management for Tandicia Team Members
 * Enables adding, editing, deleting, and updating photos/roles of team members
 * directly from the Admin Panel with real-time reactivity.
 */
import { useState, useEffect } from "react";
import { teamMembers as DEFAULT_MEMBERS } from "../data/teamData";

const TEAM_STORAGE_KEY = "tandicia_custom_team_v1";

// Get all active team members (merges/overrides default list with localStorage edits)
export function getTeamMembers() {
  try {
    const raw = localStorage.getItem(TEAM_STORAGE_KEY);
    if (!raw) return [...DEFAULT_MEMBERS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [...DEFAULT_MEMBERS];
  } catch (err) {
    console.warn("Error reading team from storage:", err);
    return [...DEFAULT_MEMBERS];
  }
}

// Save entire team list
export function saveTeamMembers(members) {
  try {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(members));
    window.dispatchEvent(new Event("tandicia_team_updated"));
    return members;
  } catch (err) {
    console.error("Failed to save team members:", err);
    throw err;
  }
}

// Add a new team member
export function addTeamMember(memberData) {
  const current = getTeamMembers();
  const newMember = {
    ...memberData,
    id: Date.now(),
    volunteerId: memberData.volunteerId || String(current.length + 1).padStart(3, "0"),
    isCustom: true
  };
  const updated = [newMember, ...current];
  saveTeamMembers(updated);
  return newMember;
}

// Update existing team member
export function updateTeamMember(id, updatedFields) {
  const current = getTeamMembers();
  const updated = current.map(m => {
    if (String(m.id) === String(id)) {
      return { ...m, ...updatedFields, isEdited: true };
    }
    return m;
  });
  saveTeamMembers(updated);
  return updated;
}

// Delete a team member
export function deleteTeamMember(id) {
  const current = getTeamMembers();
  const updated = current.filter(m => String(m.id) !== String(id));
  saveTeamMembers(updated);
  return updated;
}

// Reset team members back to original default list
export function resetTeamMembers() {
  try {
    localStorage.removeItem(TEAM_STORAGE_KEY);
    window.dispatchEvent(new Event("tandicia_team_updated"));
    return [...DEFAULT_MEMBERS];
  } catch (err) {
    console.error("Failed to reset team members:", err);
    throw err;
  }
}

// React Hook for dynamic reactive team members
export function useTeamMembers() {
  const [members, setMembers] = useState(getTeamMembers());

  useEffect(() => {
    const handleUpdate = () => {
      setMembers(getTeamMembers());
    };
    window.addEventListener("tandicia_team_updated", handleUpdate);
    return () => window.removeEventListener("tandicia_team_updated", handleUpdate);
  }, []);

  return members;
}
