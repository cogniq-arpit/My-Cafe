/**
 * database.js — Real-time database service using Supabase
 * 
 * SCHEMA SETUP (Run this in Supabase SQL Editor):
 * 
 * -- Orders table
 * create table orders (
 *   id uuid default uuid_generate_v4() primary key,
 *   user_id uuid references auth.users not null,
 *   items text not null,
 *   total numeric not null,
 *   status text default 'Delivered',
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Reservations table
 * create table reservations (
 *   id uuid default uuid_generate_v4() primary key,
 *   user_id uuid references auth.users not null,
 *   date date not null,
 *   time time not null,
 *   guests integer not null,
 *   status text default 'Confirmed',
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 * 
 * -- Addresses table
 * create table addresses (
 *   id uuid default uuid_generate_v4() primary key,
 *   user_id uuid references auth.users not null,
 *   label text not null,
 *   address text not null,
 *   created_at timestamp with time zone default timezone('utc'::text, now()) not null
 * );
 */
import { supabase } from './supabase';

export const db = {
  /** Fetch orders for a specific user */
  async getOrders(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    return data;
  },

  /** Fetch reservations for a specific user */
  async getReservations(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching reservations:', error);
      return [];
    }
    return data;
  },

  /** Fetch saved addresses for a specific user */
  async getAddresses(userId) {
    if (!userId) return [];
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
    return data;
  }
};
