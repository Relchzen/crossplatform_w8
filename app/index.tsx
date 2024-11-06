import { getPosts, getUsers, postData } from "@/services/axios";
import { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";


interface Posts {
  title: String,
  body: String,
  userId: Number,
  id: Number
}


export default function Index() {
  const [posts, setPosts] = useState([])
  const titleRef = useRef("")
  const bodyRef = useRef("")


  const getAllPosts = () => {
    getPosts().then((res) => {
      if (res.status === 200) {
        console.log(res.data)
        setPosts(res.data)
      }
    })
  }

  useEffect(() => {
    getAllPosts()
  }, [])


  const handlePostData = () => {
    const data : Posts = {
      title: titleRef.current,
      body: bodyRef.current,
      id: posts.length + 1,
      userId: 1
    }

    postData(data).then((res) => {
      console.log(res)
    })
  }
  const router = useRouter()
  
  const handleSelectItem = (id : Number) => {
    router.push({
      pathname: '/Form',
      params: {id: id.toString()}
    })
  }
  const Item = ({title, body, id, userId} : Posts) => {
    return (
        <TouchableOpacity style={styles.card} onPress={()=> handleSelectItem(id)}>
          <Text style={{
            fontSize: 16,
            fontWeight: '700',
            textAlign: 'center'
          }}>{title}</Text>
          <Text>{body}</Text>
        </TouchableOpacity>
    )
  }

  const renderItem = ({item} : {item: Posts}) => {
    return (
      <Item title={item.title} body={item.body} userId={item.userId} id={item.id} />
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <TextInput
        placeholder="Enter Title"
        onChangeText={(text) => (titleRef.current = text)}
        style={{
          height: 40,
          width: '80%',
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
        }}
      />
      <TextInput
        placeholder="Enter Body"
        onChangeText={(text) => (bodyRef.current = text)}
        style={{
          height: 40,
          width: '80%',
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 8,
        }}
      />
      <Button title="Submit" onPress={handlePostData} /> */}

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8, 
    borderColor: 'black',
    marginHorizontal: 16,
    marginVertical: 8
  }
})