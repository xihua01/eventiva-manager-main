<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$host = 'localhost';
$db = 'event_management';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM events");
        $events = [];
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
        echo json_encode($events);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $action = $data['action'];

        switch ($action) {
            case 'add':
                $id = $data['id'];
                $name = $data['name'];
                $description = $data['description'];
                $date = $data['date'];
                $location = $data['location'];
                $category = $data['category'];
                $contact = $data['contact'];
                $participants = $data['participants'];

                $stmt = $conn->prepare("INSERT INTO events (id, name, description, date, location, category, contact, participants) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $stmt->bind_param("sssssssi", $id, $name, $description, $date, $location, $category, $contact, $participants);

                if ($stmt->execute()) {
                    echo json_encode(['status' => 'success']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
                }
                $stmt->close();
                break;

            case 'update':
                $id = $data['id'];
                $name = $data['name'];
                $description = $data['description'];
                $date = $data['date'];
                $location = $data['location'];
                $category = $data['category'];
                $contact = $data['contact'];
                $participants = $data['participants'];

                $stmt = $conn->prepare("UPDATE events SET name=?, description=?, date=?, location=?, category=?, contact=?, participants=? WHERE id=?");
                $stmt->bind_param("ssssssis", $name, $description, $date, $location, $category, $contact, $participants, $id);

                if ($stmt->execute()) {
                    echo json_encode(['status' => 'success']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
                }
                $stmt->close();
                break;

            case 'delete':
                $id = $data['id'];

                $stmt = $conn->prepare("DELETE FROM events WHERE id=?");
                $stmt->bind_param("s", $id);

                if ($stmt->execute()) {
                    echo json_encode(['status' => 'success']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => $stmt->error]);
                }
                $stmt->close();
                break;

            default:
                echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
                break;
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
        break;
}

$conn->close();
?>