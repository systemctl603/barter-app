import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { db, auth } from "../firebase.conf";
import { Text, Card } from "react-native-paper";

export default function Barters() {
  const [createdByUser, setCrtdByArr] = useState([]);
  const [interestedInByUser, setIntinArr] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [allArr, setAllArr] = useState([]);
  const [lastLoaded, setLastLoaded] = useState(0);

  async function getBarters() {
    const barterRef = db.collection("trades");
    const createdByUser = barterRef
      .where("interested", "array-contains", auth.currentUser.email)
      .get();
    const interestedIn = barterRef
      .where("initiator", "==", auth.currentUser.email)
      .get();
    const all = barterRef.where("interested", "!=", null).get();

    const [
      createdByUserSnapshot,
      interestedInSnapshot,
      allSnapshot,
    ] = await Promise.all([createdByUser, interestedIn, all]);
    console.log({ createdByUserSnapshot, allSnapshot, interestedInSnapshot });
    const createdByUserArray = createdByUserSnapshot.docs;
    const interestedInArray = interestedInSnapshot.docs;

    return {
      crtdby: createdByUserArray,
      intin: interestedInArray,
      all: allSnapshot,
    };
  }

  useEffect(() => {
    getBarters().then(({ crtdby, intin, all }) => {
      var crtdbyArr = crtdby.reduce((acc, cur) => {
        var entry = cur.data();
        entry.id = cur.id;
        acc.push(entry);
        console.log(entry);
      }, []);

      var intinArr = intin.reduce((acc, cur) => {
        var entry = cur.data();
        entry.id = cur.id;
        acc.push(entry);
        console.log(entry);
      }, []);

      console.log(all);
      var lastVis = all.docs[all.docs.length - 1];
      setLastLoaded(lastVis);

      setIntinArr(intinArr);
      setCrtdByArr(crtdbyArr);
      setAllArr(all);
    });
  });

  async function loadMore() {
    setRefreshing(true);
    const all = await db
      .collection("trades")
      .where("interested", "!=", null)
      .startAfter(lastLoaded)
      .limit(25)
      .get();

    var nextToLoadFrom = all.docs[all.docs.length - 1];
    const allArr = all.docs.reduce((acc, doc) => {
      const entry = { id: doc.id, ...doc.data() };
      acc.push(entry);
    }, []);

    setLastLoaded(nextToLoadFrom);
    setAllArr((arr) => _.union(arr, allArr));
    setRefreshing(false);
  }

  const renderComponentForCreatedByUserArray = (item) => (
    <Card>
      <Card.Title title={name} subtitle={`For: ${object}`} />
      {!item.interested ? (
        <Text>No one is interested in trading</Text>
      ) : (
        <Text>{`${item.interested} is interested in your trade`}</Text>
      )}
    </Card>
  );

  const renderComponentForAll = (item) => (
    <Card>
      <Card.Title title={name} subtitle={`For: ${object}`} />
      {!item.interested ? (
        <Text>No one is interested in trading</Text>
      ) : (
        <Text>{`${item.interested} is interested to trade`}</Text>
      )}
    </Card>
  );

  const renderComponentForInterestedInByUser = (item) => (
    <Card>
      <Card.Title title={name} subtitle={`For: ${object}`} />
      {!item.interested ? (
        <Text>No one is interested in trading</Text>
      ) : (
        <Text>{`${item.interested} is interested in your trade`}</Text>
      )}
    </Card>
  );

  return (
    <View>
      <Text>Created by you</Text>
      <FlatList
        data={createdByUser}
        renderItem={renderComponentForCreatedByUserArray}
        keyExtractor={(item) => item.id}
      />
      <Text>Trades you are interested in</Text>
      <FlatList
        data={interestedInByUser}
        renderItem={renderComponentForInterestedInByUser}
        keyExtractor={(item) => item.id}
      />
      <Text>All</Text>
      <FlatList
        data={interestedInByUser}
        renderItem={renderComponentForAll}
        keyExtractor={(item) => item.id}
        onRefresh={loadMore}
        refreshing={refreshing}
      />
    </View>
  );
}
