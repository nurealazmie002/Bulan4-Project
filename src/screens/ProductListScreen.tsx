
import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { initialProducts } from '../data'; 
import ProductCard from '../components/ProductCard'; 
import { Product } from '../types'; 

interface ProductListScreenProps {
    category: string; 
}

export default function ProductListScreen({ category }: ProductListScreenProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    const filteredProducts = products.filter(p => {
        
        if (!p.category || typeof p.category !== 'string') {
            return false; 
        }
        
        const lowerCaseCategory = category.toLowerCase();
        const productCategory = p.category.toLowerCase();

        if (!['populer', 'terbaru', 'diskon'].includes(lowerCaseCategory)) {
            return productCategory === lowerCaseCategory;
        }

        if (lowerCaseCategory === 'populer') {
            return p.price > 200000; 
        } else if (lowerCaseCategory === 'terbaru') {
            return p.id > '5'; 
        } else if (lowerCaseCategory === 'diskon') {
            return p.name.toLowerCase().includes('diskon');
        }
        
        return false;
    });

    useEffect(() => {
        if (category === 'Diskon') {
            console.log(`[LOG: DISKON] Konten Diskon aktif/fokus dimuat.`);
            return () => {
                console.log(`[LOG: DISKON] Konten Diskon dinonaktifkan/ditinggalkan.`);
            };
        }
    }, [category]);


    const renderItem = ({ item }: { item: Product }) => <ProductCard item={item} />;
    
    if (filteredProducts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Tidak ada produk di kategori '{category}' saat ini.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(i) => i.id}
                contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#999' }
});