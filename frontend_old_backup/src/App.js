import { useState, useEffect } from "react";
import "@/App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, RefreshCw, CheckCircle2, Database } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [clientName, setClientName] = useState("");
  const [statusChecks, setStatusChecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all status checks
  const fetchStatusChecks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/status`);
      setStatusChecks(response.data);
      setError(null);
    } catch (e) {
      console.error("Error fetching status checks:", e);
      setError("Failed to fetch status checks");
    } finally {
      setLoading(false);
    }
  };

  // Create new status check
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API}/status`, {
        client_name: clientName,
      });
      
      setMessage(`✅ Status check created for "${response.data.client_name}"`);
      setClientName("");
      setError(null);
      
      // Refresh the list
      await fetchStatusChecks();
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (e) {
      console.error("Error creating status check:", e);
      setError("Failed to create status check");
    } finally {
      setLoading(false);
    }
  };

  // Delete status check
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete status check for "${name}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API}/status/${id}`);
      setMessage(`🗑️ Deleted status check for "${name}"`);
      setError(null);
      
      // Refresh the list
      await fetchStatusChecks();
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (e) {
      console.error("Error deleting status check:", e);
      setError("Failed to delete status check");
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Load status checks on mount
  useEffect(() => {
    fetchStatusChecks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Status Check Manager
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Flask + MySQL + React Integration Demo
          </p>
        </div>

        {/* Messages */}
        {message && (
          <Alert className="bg-green-900/50 border-green-500 text-green-100">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="bg-red-900/50 border-red-500 text-red-100">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Create Form */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Create New Status Check</CardTitle>
            <CardDescription className="text-gray-400">
              Add a new client status check to the MySQL database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter client name..."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                disabled={loading}
                data-testid="client-name-input"
              />
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="create-button"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Status Checks List */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Status Checks</CardTitle>
                <CardDescription className="text-gray-400">
                  Total records: {statusChecks.length}
                </CardDescription>
              </div>
              <Button
                onClick={fetchStatusChecks}
                variant="outline"
                size="sm"
                className="border-gray-600 text-white hover:bg-gray-700"
                disabled={loading}
                data-testid="refresh-button"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {statusChecks.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No status checks yet</p>
                <p className="text-sm">Create your first status check above</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-700/50">
                      <TableHead className="text-gray-300">Client Name</TableHead>
                      <TableHead className="text-gray-300">Timestamp</TableHead>
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusChecks.map((check) => (
                      <TableRow
                        key={check.id}
                        className="border-gray-700 hover:bg-gray-700/30"
                        data-testid={`status-row-${check.id}`}
                      >
                        <TableCell className="font-medium text-white">
                          {check.client_name}
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {formatDate(check.timestamp)}
                        </TableCell>
                        <TableCell className="text-gray-500 text-xs font-mono">
                          {check.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleDelete(check.id, check.client_name)}
                            variant="destructive"
                            size="sm"
                            disabled={loading}
                            data-testid={`delete-button-${check.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm py-4">
          <p>Powered by Flask, MySQL, and React</p>
        </div>
      </div>
    </div>
  );
}

export default App;
