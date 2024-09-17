import React, { useState } from "react";
import { Modal, View, Button, StyleSheet } from "react-native";

import TextStyle from "./TextStyle";

function ModalDialog({ message, cancelText, okText, callbacks }) {
  const [modalVisible, setModalVisible] = useState(true);

  const callback = {
    onClose: () => {
      setModalVisible(false);

      if (callbacks === undefined || typeof callbacks.onClose !== "function")
        return false;

      callbacks.onClose();
    },
    onOk: () => {
      setModalVisible(false);

      if (callbacks === undefined || typeof callbacks.onOk !== "function")
        return false;

      callbacks.onOk();
    },
    onCancel: () => {
      setModalVisible(false);

      if (callbacks === undefined || typeof callbacks.onCancel !== "function")
        return false;

      callbacks.onCancel();
    },
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => callback.onClose()}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextStyle style={styles.modalText}>
              {message || "Are you sure you want to continue?"}
            </TextStyle>

            <View style={styles.dialogBtns}>
              <Button
                title={cancelText || "Cancel"}
                onPress={() => callback.onCancel()}
              />
              <Button title={okText || "Ok"} onPress={() => callback.onOk()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContainer: {
    width: 350,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Android shadow
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Medium",
  },

  dialogBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default ModalDialog;
