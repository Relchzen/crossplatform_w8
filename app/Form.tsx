import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { getPost, updatePost } from '@/services/axios'

interface Post {
  title: string,
  body: string,
  userId: Number,
  id: Number
}

export default function Form() {
  const router = useRouter()
  const { id } = useLocalSearchParams()
  const [post, setPost] = useState<Post>({
    title: '',
    body: '',
    id: 1,
    userId: 1
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPost(Number(id));
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdatePost = async () => {
    try {
      const response = await updatePost(post.id, post); // Use post object
      if (response.status === 200) {
        console.log('Post updated successfully!');
        // Handle success (optional: navigate back)
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleInputChange = (field: 'title' | 'body', value: string) => {
    setPost((prevPost) => ({ ...prevPost, [field]: value }));
  };

  const handleBack = () => {
    router.back()
  }

  return (
    <View>
      <TextInput
        style={[styles.textInput, {fontWeight: '600'}]}
        value={post.title}
        onChangeText={(text) => handleInputChange('title', text)}
        multiline={true}
        placeholder="Title"
        
      />
      <TextInput
        style={styles.textInput}
        value={post.body}
        onChangeText={(text) => handleInputChange('body', text)}
        placeholder="Body"
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Update" onPress={handleUpdatePost} />
      <Button title="Go Back" onPress={handleBack} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});