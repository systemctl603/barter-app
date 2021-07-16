import React from "react";
import { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Title, Card, Paragraph } from "react-native-paper";
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
                snapshot.forEach(function (doc) {
                    doc.ref.update({
                        read: true
                    })
                })
            });

    }, [])

    var renderItem = ({ item }) => (
        <Card>
            <Card.Title title={`From: ${item.from}`} />
            <Card.Content>
                <Paragraph>{item.msg}</Paragraph>
            </Card.Content>
        </Card>
    )

    return (
        <ScrollView>
            <Title>Notifications</Title>
            <FlatList
                keyExtractor={item => item.id}
                data={notifications}
                renderItem={renderItem}
            />
        </ScrollView>
    );
}