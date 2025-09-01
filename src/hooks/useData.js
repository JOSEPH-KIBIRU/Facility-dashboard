/* eslint-disable react-hooks/exhaustive-deps */


// src/hooks/useData.js
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Properties hook
export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const createProperty = async (propertyData) => {
    try {
      const { data, error } = await supabase
        .from("properties")
        .insert([propertyData])
        .select()
        .single();

      if (error) throw error;
      await fetchProperties(); // Refresh the list
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
   const updateProperty = async (propertyId, updates) => {
    try {
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('properties')
        .update(updates)
        .eq('id', propertyId)
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      await fetchProperties();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      setError(null);
      
      const { error: supabaseError } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (supabaseError) throw supabaseError;
      await fetchProperties();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { 
    properties, 
    loading, 
    error, 
    refetch: fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty  
  };
};

// src/hooks/useData.js - CORRECTED useBills hook
export const useBills = (type = null) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('bills')
        .select('*');

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error: supabaseError } = await query.order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;
      setBills(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching bills:', err);
    } finally {
      setLoading(false);
    }
  };

  // Define updateBill BEFORE it's used in markAsPaid
  const updateBill = async (billId, updates) => {
    try {
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('bills')
        .update(updates)
        .eq('id', billId)
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      await fetchBills(); // Refresh the list
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteBill = async (billId) => {
    try {
      setError(null);
      
      const { error: supabaseError } = await supabase
        .from('bills')
        .delete()
        .eq('id', billId);

      if (supabaseError) throw supabaseError;
      await fetchBills(); // Refresh the list
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const markAsPaid = async (billId) => {
    return updateBill(billId, { 
      status: 'paid',
      paid_date: new Date().toISOString().split('T')[0] // Today's date
    });
  };

  const createBill = async (billData) => {
    try {
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('bills')
        .insert([billData])
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      await fetchBills(); // Refresh the list
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Add real-time subscription
  useEffect(() => {
    fetchBills();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('bills-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bills'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchBills();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [type]);

  return { 
    bills, 
    loading, 
    error, 
    refetch: fetchBills,
    createBill,
    updateBill,
    deleteBill,
    markAsPaid
  };
};
// src/hooks/useData.js - SIMPLER VERSION (no useCallback needed)
export const useStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        console.log('🔄 useStaff: Fetching data...');
        setLoading(true);
        setError(null);
        
        const { data, error: supabaseError } = await supabase
          .from('staff')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          console.error('❌ useStaff: Error:', supabaseError);
          throw supabaseError;
        }

        console.log('✅ useStaff: Data received:', data);
        setStaff(data || []);
        
      } catch (err) {
        console.error('❌ useStaff: Catch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    console.log('🔗 useStaff: useEffect running');
    fetchStaff();

    // Add real-time updates
    const subscription = supabase
      .channel('staff-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'staff'
        },
        (payload) => {
          console.log('📢 useStaff: Real-time update', payload);
          fetchStaff();
        }
      )
      .subscribe();

    return () => {
      console.log('🧹 useStaff: Cleaning up');
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array

  const refetch = () => {
    // You can keep this simple or implement a proper refetch
    window.location.reload();
  };

  const createStaff = async (staffData) => {
    try {
      setError(null);
      console.log('💾 useStaff: Creating staff', staffData);
      
      const { data, error: supabaseError } = await supabase
        .from('staff')
        .insert([staffData])
        .select()
        .single();

      if (supabaseError) throw supabaseError;
      
      console.log('✅ useStaff: Staff created', data);
      refetch(); // Refresh the list
      return data;
      
    } catch (err) {
      console.error('❌ useStaff: Create error', err);
      setError(err.message);
      throw err;
    }
  };

  return { 
    staff, 
    loading, 
    error, 
    refetch,
    createStaff
  };
};
// src/hooks/useData.js - ADD useRepairs hook
export const useRepairs = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching repairs...');
      
      const { data, error: supabaseError } = await supabase
        .from('repairs')
        .select(`
          *,
          property:property_id (id, name, address)
        `)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Repairs error:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Repairs data received:', data);
      setRepairs(data || []);
      
    } catch (err) {
      console.error('❌ Error in fetchRepairs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();

    // Real-time updates
    const subscription = supabase
      .channel('repairs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'repairs'
        },
        (payload) => {
          console.log('📢 Real-time repair update:', payload);
          fetchRepairs();
        }
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  const createRepair = async (repairData) => {
    try {
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('repairs')
        .insert([repairData])
        .select(`
          *,
          property:property_id (id, name, address)
        `)
        .single();

      if (supabaseError) throw supabaseError;
      await fetchRepairs();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRepair = async (repairId, updates) => {
    try {
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('repairs')
        .update(updates)
        .eq('id', repairId)
        .select(`
          *,
          property:property_id (id, name, address)
        `)
        .single();

      if (supabaseError) throw supabaseError;
      await fetchRepairs();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteRepair = async (repairId) => {
    try {
      setError(null);
      
      const { error: supabaseError } = await supabase
        .from('repairs')
        .delete()
        .eq('id', repairId);

      if (supabaseError) throw supabaseError;
      await fetchRepairs();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateRepairStatus = async (repairId, status) => {
    const updates = { status };
    
    if (status === 'completed') {
      updates.completed_date = new Date().toISOString().split('T')[0];
    }
    
    return updateRepair(repairId, updates);
  };

  return { 
    repairs, 
    loading, 
    error, 
    refetch: fetchRepairs,
    createRepair,
    updateRepair,
    deleteRepair,
    updateRepairStatus
  };
};
// Utility function to fetch properties for forms
export const usePropertiesForForms = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("properties")
        .select("id, name, address")
        .order("name");

      if (error) throw error;
      setProperties(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching properties for form:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
};

// Dashboard statistics hook
export const useDashboardStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get properties count
      const { count: propertiesCount } = await supabase
        .from("properties")
        .select("*", { count: "exact" });

      // Get pending bills count
      const { count: pendingBillsCount } = await supabase
        .from("bills")
        .select("*", { count: "exact" })
        .eq("status", "pending");

      // Get pending repairs count
      const { count: pendingRepairsCount } = await supabase
        .from("repairs")
        .select("*", { count: "exact" })
        .eq("status", "pending");

      // Get staff count
      const { count: staffCount } = await supabase
        .from("staff")
        .select("*", { count: "exact" });

      setStats({
        properties: propertiesCount || 0,
        pendingBills: pendingBillsCount || 0,
        pendingRepairs: pendingRepairsCount || 0,
        staff: staffCount || 0,
      });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
