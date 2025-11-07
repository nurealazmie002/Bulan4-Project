import React, { useState, memo } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, Button } from 'react-native';
import { Product, NewProductInput, ValidationErrors, AddProductModalProps } from '../types'; // Impor dari src/types.ts

const AddProductModal = memo(function AddProductModal({
  visible,
  onClose,
  onAdd,
}: AddProductModalProps) {
  const [newProduct, setNewProduct] = useState<NewProductInput>({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({} as ValidationErrors);

  const validate = (): boolean => {
    const errs: ValidationErrors = {};
    const priceNum = Number(newProduct.price);

    if (!newProduct.name.trim()) errs.name = 'Nama produk wajib diisi.';
    if (!newProduct.price.trim() || isNaN(priceNum) || priceNum <= 0)
      errs.price = 'Harga wajib diisi dan harus angka positif.';
    if (!newProduct.imageUrl.trim() || !/^https?:\/\//i.test(newProduct.imageUrl))
      errs.imageUrl = 'URL gambar wajib valid.';
    if (!newProduct.description.trim()) errs.description = 'Deskripsi wajib diisi.';

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name.trim(),
      price: Number(newProduct.price),
      imageUrl: newProduct.imageUrl.trim(),
      description: newProduct.description.trim(),
    };

    onAdd(product);
    setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
    setValidationErrors({} as ValidationErrors);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Tambah Produk Baru</Text>

          <TextInput
            value={newProduct.name}
            onChangeText={(text) => setNewProduct((p) => ({ ...p, name: text }))}
            placeholder="Nama produk"
            placeholderTextColor="#A9A9A9"
            style={[styles.input, validationErrors.name && styles.inputError]}
          />
          {validationErrors.name ? <Text style={styles.error}>{validationErrors.name}</Text> : null}

          <TextInput
            value={newProduct.price}
            onChangeText={(text) => setNewProduct((p) => ({ ...p, price: text }))}
            placeholder="Harga"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            style={[styles.input, validationErrors.price && styles.inputError]}
          />
          {validationErrors.price ? <Text style={styles.error}>{validationErrors.price}</Text> : null}

          <TextInput
            value={newProduct.imageUrl}
            onChangeText={(text) => setNewProduct((p) => ({ ...p, imageUrl: text }))}
            placeholder="URL Gambar"
            placeholderTextColor="#A9A9A9"
            style={[styles.input, validationErrors.imageUrl && styles.inputError]}
            autoCapitalize="none"
          />
          {validationErrors.imageUrl ? <Text style={styles.error}>{validationErrors.imageUrl}</Text> : null}

          <TextInput
            value={newProduct.description}
            onChangeText={(text) => setNewProduct((p) => ({ ...p, description: text }))}
            placeholder="Deskripsi"
            placeholderTextColor="#A9A9A9"
            style={[styles.input, { height: 80, textAlignVertical: 'top' }, validationErrors.description && styles.inputError]}
            multiline
          />
          {validationErrors.description ? <Text style={styles.error}>{validationErrors.description}</Text> : null}

          <View style={styles.modalButtons}>
            <Button title="Batal" color="#9E9E9E" onPress={onClose} />
            <Button title="Tambah" color="#4CAF50" onPress={handleAdd} />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default AddProductModal;

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)' },
  modalView: { width: '92%', maxWidth: 480, backgroundColor: '#fff', borderRadius: 14, padding: 18, elevation: 6 },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 10, marginTop: 8 },
  inputError: { borderColor: '#EF5350' },
  error: { color: '#D32F2F', marginTop: 6, fontSize: 12 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
});