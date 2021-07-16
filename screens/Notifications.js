import React from "react";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, ScrollView, TouchableHighlight } from "react-native";
import { Title, Card, Paragraph } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import { auth, db } from "../firebase.conf";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        db
            .collection("notifications")
            .where("to", "==", auth.currentUser.email)
            .orderBy("timestamp")
            .get()
            .then(snapshot => {
                var notifs = snapshot.docs.map(doc => ({ 'id': doc.id, ...doc.data() }));
                setNotifications(notifs);
            });

    }, [])

    const markAsRead = (notif) => {
        db.collection("notifications").doc(notif.id).update({
            read: true
        })
    }

    var renderItem = ({ item }) => (
        <Card>
            <Card.Title title={`From: ${item.from}`} />
            <Card.Content>
                <Paragraph>{item.msg}</Paragraph>
            </Card.Content>
        </Card>
    )

    var hiddenRenderItem = ({ item }) => (
        <TouchableHighlight onPress={() => markAsRead(item)}>
            <View>
                <Text>Delete</Text>
            </View>
        </TouchableHighlight>
    )

    return (
        <ScrollView>
            <Title>Notifications</Title>
            <SwipeListView
                disableLeftSwipe
                renderItem={renderItem}
                renderHiddenItem={hiddenRenderItem}
                data={notifications}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                keyExtractor={i => i.id}
            />
        </ScrollView>
    );
}