import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Box,
  Chip,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import { NotificationsActive, Event, School, Work } from "@mui/icons-material";

const TYPE_COLORS = {
  Placement: { color: "success", icon: <Work fontSize="small" /> },
  Event: { color: "primary", icon: <Event fontSize="small" /> },
  Result: { color: "secondary", icon: <School fontSize="small" /> },
  Default: { color: "default", icon: <NotificationsActive fontSize="small" /> },
};

const NotificationApp = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notifications");

        console.log("API RESPONSE:", response.data); // DEBUG

        setData(response.data.data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const filteredList = useMemo(() => {
    if (category === "All") return data;
    return data.filter((item) => item.Type === category);
  }, [category, data]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Updates & Alerts
        </Typography>

        <FormControl size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            value={category}
            label="Filter"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredList.length === 0 ? (
        <Typography textAlign="center" color="gray">
          No notifications found
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredList.map((note) => {
            const style = TYPE_COLORS[note.Type] || TYPE_COLORS.Default;

            return (
              <Grid item xs={12} key={note.ID}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: `${style.color}.light`,
                        color: `${style.color}.main`,
                      }}
                    >
                      {style.icon}
                    </Box>

                    <Box flexGrow={1}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Chip
                          label={note.Type}
                          color={style.color}
                          size="small"
                        />

                        <Typography variant="caption">
                          {new Date(note.Timestamp).toLocaleString()}
                        </Typography>
                      </Box>

                      <Typography>{note.Message}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default NotificationApp;