import React, { useState, memo } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Product, NewProductInput, ValidationErrors, AddProductModalProps } from '../types';

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
    category: 'Pakaian',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({} as ValidationErrors);

  const categories = ['Pakaian', 'Sepatu', 'Aksesoris'];

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
      category: newProduct.category,
    };

    onAdd(product);
    setNewProduct({ name: '', price: '', imageUrl: '', description: '', category: 'Pakaian' });
    setValidationErrors({} as ValidationErrors);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>➕ Tambah Produk Baru</Text>

            <Text style={styles.label}>Nama Produk</Text>
            <TextInput
              value={newProduct.name}
              onChangeText={(text) => setNewProduct((p) => ({ ...p, name: text }))}
              placeholder="Contoh: Kemeja Katun Premium"
              placeholderTextColor="#A9A9A9"
              style={[styles.input, validationErrors.name && styles.inputError]}
            />
            {validationErrors.name ? <Text style={styles.error}>{validationErrors.name}</Text> : null}

            <Text style={styles.label}>Harga</Text>
            <TextInput
              value={newProduct.price}
              onChangeText={(text) => setNewProduct((p) => ({ ...p, price: text }))}
              placeholder="Contoh: 150000"
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
              style={[styles.input, validationErrors.price && styles.inputError]}
            />
            {validationErrors.price ? <Text style={styles.error}>{validationErrors.price}</Text> : null}

            <Text style={styles.label}>URL Gambar</Text>
            <TextInput
              value={newProduct.imageUrl}
              onChangeText={(text) => setNewProduct((p) => ({ ...p, imageUrl: text }))}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#A9A9A9"
              style={[styles.input, validationErrors.imageUrl && styles.inputError]}
              autoCapitalize="none"
            />
            {validationErrors.imageUrl ? (
              <Text style={styles.error}>{validationErrors.imageUrl}</Text>
            ) : null}

            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.categoryButton,
                    newProduct.category === cat && styles.categoryButtonActive,
                  ]}
                  onPress={() => setNewProduct((p) => ({ ...p, category: cat }))}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      newProduct.category === cat && styles.categoryButtonTextActive,
                    ]}
                  >
                    {cat === 'Pakaian' && '👕 '}
                    {cat === 'Sepatu' && '👟 '}
                    {cat === 'Aksesoris' && '💎 '}
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Deskripsi</Text>
            <TextInput
              value={newProduct.description}
              onChangeText={(text) => setNewProduct((p) => ({ ...p, description: text }))}
              placeholder="Tulis deskripsi produk..."
              placeholderTextColor="#A9A9A9"
              style={[
                styles.input,
                styles.textArea,
                validationErrors.description && styles.inputError,
              ]}
              multiline
              numberOfLines={4}
            />
            {validationErrors.description ? (
              <Text style={styles.error}>{validationErrors.description}</Text>
            ) : null}

            <View style={styles.modalButtons}>
              <Pressable style={[styles.button, styles.buttonCancel]} onPress={onClose}>
                <Text style={styles.buttonCancelText}>Batal</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonAdd]} onPress={handleAdd}>
                <Text style={styles.buttonAddText}>Tambah Produk</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

export default AddProductModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF5350',
    backgroundColor: '#FFEBEE',
  },
  error: {
    color: '#D32F2F',
    marginTop: 4,
    fontSize: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#FF7043',
    borderColor: '#FF7043',
  },
  categoryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
  },
  buttonCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  buttonAdd: {
    backgroundColor: '#4CAF50',
  },
  buttonAddText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});