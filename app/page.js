"use client";

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { firestore } from './firebase';
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const containerStyle = {
  width: '90%',
  maxWidth: '1500px',
  height: '90%',
  borderRadius: '16px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  bgcolor: '#ffffff',
  overflow: 'hidden',
  padding: 4,
  position: 'relative',
  zIndex: 1,
};

const backgroundImageStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/pantry_wallpaper1.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: -1,
};

const tabContentStyle = {
  mt: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

const categoryContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  maxWidth: '1500px',
  padding: 2,
  marginTop: 0,
  overflowY: 'auto',
  maxHeight: '520px', // Set a maximum height for the container
};

const itemsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  width: '100%',
};

const searchContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

const searchBarStyle = {
  flexGrow: 1,
  borderRadius: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
  },
};

const searchAddButtonStyle = {
  backgroundColor: '#2196f3',
  color: 'white',
  borderRadius: '20px',
  '&:hover': {
    backgroundColor: 'darkblue',
  },
};

const itemBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 1,
  bgcolor: '#fff',
  boxShadow: 2,
  borderRadius: '8px',
  width: '250px',
  height: '150px',
  textAlign: 'center',
};

const itemNameStyle = {
  fontWeight: 'bold',
  mb: 1,
  fontSize: '1.2rem',
};

const itemQuantityContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  justifyContent: 'center',
  mb: 1,
};

const buttonStyle = {
  fontSize: '24px',
  border: '1px solid',
  borderRadius: '50%',
  p: 1,
};

const addButtonStyle = {
  ...buttonStyle,
  borderColor: 'green',
  color: 'green',
  '&:hover': {
    borderColor: 'darkgreen',
    backgroundColor: 'transparent',
  },
};

const removeButtonStyle = {
  ...buttonStyle,
  borderColor: 'red',
  color: 'red',
  '&:hover': {
    borderColor: 'darkred',
    backgroundColor: 'transparent',
  },
};

export default function Home() {
  const [pantry, setPantry] = useState({});
  const [groceryList, setGroceryList] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry_items'));
    const docs = await getDocs(snapshot);
    const pantryList = {};
    docs.forEach((doc) => {
      const data = doc.data();
      const { category, count } = data;
      if (!pantryList[category]) {
        pantryList[category] = [];
      }
      pantryList[category].push({ name: doc.id, count });
    });
    setPantry(pantryList);
  };

  const updateGroceryList = async () => {
    const snapshot = query(collection(firestore, 'grocery_list'));
    const docs = await getDocs(snapshot);
    const groceryList = {};
    docs.forEach((doc) => {
      const data = doc.data();
      const { category, count } = data;
      if (!groceryList[category]) {
        groceryList[category] = [];
      }
      groceryList[category].push({ name: doc.id, count });
    });
    setGroceryList(groceryList);
  };

  useEffect(() => {
    updatePantry();
    updateGroceryList();
  }, []);

  const addPantryItem = async () => {
    const formattedItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
    const docRef = doc(collection(firestore, 'pantry_items'), formattedItemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(docRef, { count: (data.count || 0) + 1 }, { merge: true });
    } else {
      await setDoc(docRef, { count: 1, category: category || 'Others' });
    }
    await updatePantry();
  };

  const removePantryItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry_items'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count <= 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 }, { merge: true });
      }
    }
    await updatePantry();
  };

  const addGroceryItem = async () => {
    const formattedItemName = itemName.charAt(0).toUpperCase() + itemName.slice(1).toLowerCase();
    const docRef = doc(collection(firestore, 'grocery_list'), formattedItemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(docRef, { count: (data.count || 0) + 1 }, { merge: true });
    } else {
      await setDoc(docRef, { count: 1, category: category || 'Others' });
    }
    await updateGroceryList();
  };

  const removeGroceryItem = async (item) => {
    const docRef = doc(collection(firestore, 'grocery_list'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count <= 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 }, { merge: true });
      }
    }
    await updateGroceryList();
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleAddItemClick = () => {
    if (tabIndex === 0) {
      addPantryItem();
    } else if (tabIndex === 1) {
      addGroceryItem();
    }
    handleClose();
  };

  const handleRemoveItem = (item) => {
    if (tabIndex === 0) {
      removePantryItem(item);
    } else if (tabIndex === 1) {
      removeGroceryItem(item);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      sx={{ position: 'relative' }}
    >
      <Box sx={backgroundImageStyle} />
      <Box sx={containerStyle}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" color="primary" gutterBottom>
            PantryPal
          </Typography>
        </Box>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="My Pantry" />
          <Tab label="My Grocery List" />
        </Tabs>
        <Box sx={tabContentStyle}>
          <Box sx={searchContainerStyle}>
          <TextField
                placeholder="Search for an item..."
                variant="outlined"
                onChange={(e) => setItemName(e.target.value)}
                value={itemName}
                sx={searchBarStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        sx={searchAddButtonStyle}
                        startIcon={<AddCircleOutline />}
                        onClick={handleOpen}
                      >
                        Add Item
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
          </Box>
          <Box sx={categoryContainerStyle}>
            {tabIndex === 0 && Object.keys(pantry).map((cat) => (
              <Box key={cat} sx={{ width: '100%' }}>
                <Typography variant="h5" color="primary">
                  {cat}
                </Typography>
                <Box sx={itemsContainerStyle}>
                  {pantry[cat].map((item) => (
                    <Box key={item.name} sx={itemBoxStyle}>
                      <Typography sx={itemNameStyle}>{item.name}</Typography>
                      <Box sx={itemQuantityContainerStyle}>
                        <IconButton
                          sx={removeButtonStyle}
                          onClick={() => handleRemoveItem(item.name)}
                        >
                          <RemoveCircleOutline />
                        </IconButton>
                        <Typography>Quantity: {item.count}</Typography>
                        <IconButton
                          sx={addButtonStyle}
                          onClick={() => handleAddItemClick(item.name)}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
            {tabIndex === 1 && Object.keys(groceryList).map((cat) => (
              <Box key={cat} sx={{ width: '100%' }}>
                <Typography variant="h5" color="primary">
                  {cat}
                </Typography>
                <Box sx={itemsContainerStyle}>
                  {groceryList[cat].map((item) => (
                    <Box key={item.name} sx={itemBoxStyle}>
                      <Typography sx={itemNameStyle}>{item.name}</Typography>
                      <Box sx={itemQuantityContainerStyle}>
                        <IconButton
                          sx={removeButtonStyle}
                          onClick={() => handleRemoveItem(item.name)}
                        >
                          <RemoveCircleOutline />
                        </IconButton>
                        <Typography>Quantity: {item.count}</Typography>
                        <IconButton
                          sx={addButtonStyle}
                          onClick={() => handleAddItemClick(item.name)}
                        >
                          <AddCircleOutline />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6">Add Item</Typography>
            <TextField
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              label="Item Name"
              variant="outlined"
              fullWidth
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="Dairy">Dairy</MenuItem>
                <MenuItem value="Meat">Meat</MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Grains">Grains</MenuItem>
                <MenuItem value="Snacks">Snacks</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleAddItemClick}
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Item
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
