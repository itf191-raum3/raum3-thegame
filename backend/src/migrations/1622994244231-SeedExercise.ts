import {getManager, MigrationInterface, QueryRunner} from "typeorm";
import {Subject} from "@/entities/Subject";
import {Choice} from "@/entities/Choice";

export class SeedExercise1622994244231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const subject = await getManager().findOneOrFail(Subject, {where: {label: "AE"}});
        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Welches SQL-Schlüsselwort listet die Eigenschaften eines Datensatzes auf?",
            correctAnswers: ['SELECT'],
            possibleAnswers: ['SELECT', 'UPDATE', 'ALTER', 'DELETE'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Welches SQL-Schlüsselwort löscht einen Datensatz?",
            correctAnswers: ['DELETE'],
            possibleAnswers: ['CREATE', 'UPDATE', 'ALTER', 'DELETE'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Welches SQL-Schlüsselwort verändert die Datensätze einer Tabelle?",
            correctAnswers: ['UPDATE'],
            possibleAnswers: ['CREATE', 'UPDATE', 'ALTER', 'DELETE'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Welches SQL-Schlüsselwort verändert die Spalten einer Tabelle?",
            correctAnswers: ['ALTER'],
            possibleAnswers: ['CREATE', 'UPDATE', 'ALTER', 'DELETE'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Welcher Aufruf der Methode method(int i, float f) ist NICHT korrekt?",
            correctAnswers: ['method(1.3, 2)'],
            possibleAnswers: ['method(1.3, 2)', 'method(1, 2.1)', 'method(1, 3)'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Welche Art von Softwaretests ist die kleinste?",
            correctAnswers: ['Unittests'],
            possibleAnswers: ['Szenariotests', 'Unittests', 'Integrationstests'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Welche Sichtbarkeit ist für die eigene und erbende Klassen erreichbar?",
            correctAnswers: ['protected'],
            possibleAnswers: ['public', 'protected', 'private'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Welche Sichtbarkeit ist nur für die eigene Klasse erreichbar?",
            correctAnswers: ['private'],
            possibleAnswers: ['public', 'protected', 'private'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Welche Sichtbarkeit ist für alle Klassen erreichbar?",
            correctAnswers: ['public'],
            possibleAnswers: ['public', 'protected', 'private'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 3,
            label: "Welcher Raum ist der beste?",
            correctAnswers: ['Raum 3'],
            possibleAnswers: ['Raum 1', 'Raum 2', 'Raum 3', 'Raum 4', 'Raum 5', 'Raum 6'],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Wählen Sie alle richtigen Aussagen zu Konstruktoren aus - nicht nur diejenigen, welche Konstruktoren von normalen Methoden unterscheiden:",
            correctAnswers: [
                'Bei jedem new wird er ausgeführt',
                'Der Name ist derselbe wie der Name der Klasse.',
                'Er kann überladen werden.',
                'Er wird für die Instanziierung benötigt',
                'Er ist im Normalfall public.',
				'Er hat keinen Rückgabetyp.'
            ],
            possibleAnswers: [
                'Bei jedem new wird er ausgeführt.',
                'Der Name ist derselbe wie der Name der Klasse.',
                'Er kann überladen werden.',
                'Er hat keine Parameter.',
                'Er hat den Namen this().',
                'Er wird bei der Zerstörung eines Objekts aufgerufen.',
                'Er hat keinen Rückgabetyp.',
                'Er hat den Namen constructor().',
                'Er kann als Rückgabetyp nur void haben.',
                'Er wird für die Instanziierung benötigt.',
                'Er ist im Normalfall public.'
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Wählen Sie alle richtigen Aussagen zum Thema Überladung aus.",
            correctAnswers: [
                'Überladene Methoden haben alle denselben Namen.',
                'Überladungen können nur innerhalb eines "scopes" definiert werden.',
                'Der Compiler optimiert Überladungen, indem sie intern zusammengefasst werden.',
                'Beim Aufruf wird u.a. anhand der Datentypen der Parameter entschieden, welche Überladung verwendet wird.',
                'Beim Aufruf wird u.a. anhand der Anzahl der Parameter entschieden, welche Überladung verwendet wird.',
                'Beim Aufruf wird u.a. anhand der Reihenfolge der Parameter entschieden, welche Überladung verwendet wird.'
            ],
            possibleAnswers: [
                'Überladene Methoden haben alle denselben Namen.',
                'Überladungen können nur innerhalb eines "scopes" definiert werden.',
                'Der Compiler optimiert Überladungen, indem sie intern zusammengefasst werden.',
                'Beim Aufruf wird u.a. anhand der Datentypen der Parameter entschieden, welche Überladung verwendet wird.',
                'Überladung ist eine Überschreibung von Methoden.',
                'Überladene Klassen haben alle denselben Namen.',
                'Der Compiler kann beim Aufruf anhand der Namen der Parameter entscheiden, welche Überladung verwendet wird. So kann z.B. void meth(string vorname, string nachname) von meth( string strasse, string ort) unterschieden werden.',
                'Beim Aufruf wird u.a. anhand der Rückgabetypen entschieden, welche Überladung verwendet wird.',
                'Beim Aufruf wird u.a. anhand der Anzahl der Parameter entschieden, welche Überladung verwendet wird.',
                'Nur Konstruktoren können überladen werden.',
                'Beim Aufruf wird u.a. anhand der Reihenfolge der Parameter entschieden, welche Überladung verwendet wird.'
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 3,
            label: "Was unterscheidet Konstruktoren von anderen Methoden?",
            correctAnswers: [
                'Er kann nur ein einziges Mal im Leben eines Objekts aufgerufen werden.',
                'Der Name ist derselbe wie der Name der Klasse.',
                'Er hat keinen Rückgabetyp.',
                'Er wird für die Instanziierung benötigt.',
            ],
            possibleAnswers: [
                'Er kann nur ein einziges Mal im Leben eines Objekts aufgerufen werden.',
                'Er kann überladen werden.',
                'Der Name ist derselbe wie der Name der Klasse.',
                'Er ist public.',
                'Er hat keinen Rückgabetyp.',
                'Er kann  eine unterschiedliche Anzahl an Parametern haben.',
                'Er wird bei der Zerstörung eines Objekts aufgerufen.',
                'Er hat keine Parameter.',
                'Er hat den Namen constructor().',
                'Er kann überschrieben werden.',
                'Er kann als Rückgabetyp nur void haben.',
                'Er wird für die Instanziierung benötigt.',
                'Er hat den Namen this().'
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 3,
            label: "Wählen Sie alle richtigen Aussagen zum Thema Kapselung aus.",
            correctAnswers: [
                'Der lesende und schreibende Zugriff auf Instanzvariablen erfolgt ausschließlich über set-Methoden.',
                'Methoden werden durch das Schlüsselwort private geschützt.',
                'Der Zugriff auf Instanzvariablen von außerhalb der Klasse (und außerhalb der Vererbungshierarchie) erfolgt ausschließlich über public-Methoden.',
                'Nur innerhalb der Klasse kann man mit private Attributen arbeiten.',
                'Instanzvariablen werden durch das Schlüsselwort private vor Zugriffe von Außen geschützt.',
                'Man kann Attribute innerhalb einer Klasse wiederverwenden.'
            ],
            possibleAnswers: [
                'Kapselung hilft dabei Fehler zu vermeiden, die durch den Einsatz von globalen Variablen entstehen.',
                'Der lesende und schreibende Zugriff auf Instanzvariablen erfolgt ausschließlich über set-Methoden.',
                'Methoden werden durch das Schlüsselwort private geschützt.',
                'Der Zugriff auf Instanzvariablen von außerhalb der Klasse (und außerhalb der Vererbungshierarchie) erfolgt ausschließlich über public-Methoden.',
                'Nur innerhalb der Klasse kann man mit private Attributen arbeiten.',
                'Instanzvariablen werden durch das Schlüsselwort private vor Zugriffe von Außen geschützt.',
                'Man kann Attribute innerhalb einer Klasse wiederverwenden.',
                'Kapselung hilft dabei Fehler zu vermeiden, die durch falsche Methodenaufrufe entstehen.',
                'Kapselung hilft dabei Fehler durch Stack-Tracing aufzuspüren.',
                'Eigenschaften werden durch das Schlüsselwort public geschützt.',
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Was ist HTML?",
            correctAnswers: [
                'Eine Markup Language'
            ],
            possibleAnswers: [
                'Eine Programmiersprache',
                'Eine Scriptsprache',
                'Eine Stylesheet sprache',
                'Eine Markup Language'
            ],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Was ist Javascript?",
            correctAnswers: [
                'Eine Scriptsprache',
            ],
            possibleAnswers: [
                'Eine Programmiersprache',
                'Eine Scriptsprache',
                'Eine Stylesheet sprache',
                'Eine Markup Language'
            ],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 1,
            label: "Was ist Java?",
            correctAnswers: [
                'Eine Programmiersprache',
            ],
            possibleAnswers: [
                'Eine Programmiersprache',
                'Eine Scriptsprache',
                'Eine Stylesheet sprache',
                'Eine Markup Language'
            ],
            subject: subject,
            isMultipleChoice: false
        });


        await getManager().insert(Choice, {
            difficulty: 2,
            label: "Was ist CSS?",
            correctAnswers: [
                'Eine Markup Language'
            ],
            possibleAnswers: [
                'Eine Programmiersprache',
                'Eine Scriptsprache',
                'Eine Stylesheet sprache',
                'Eine Markup Language'
            ],
            subject: subject,
            isMultipleChoice: false
        });

        await getManager().insert(Choice, {
            difficulty: 2,
            label: "was ist ein Boolean?",
            correctAnswers: [
                'Eine Warheitswert',
            ],
            possibleAnswers: [
                'Eine Ganzzahl',
                'Eine Warheitswert',
                'Eine Gleitkommazahl',
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 3,
            label: "was ist ein Integer?",
            correctAnswers: [
                'Eine Ganzzahl',
            ],
            possibleAnswers: [
                'Eine Ganzzahl',
                'Eine Warheitswert',
                'Eine Gleitkommazahl',
            ],
            subject: subject,
            isMultipleChoice: true
        });

        await getManager().insert(Choice, {
            difficulty: 3,
            label: "was ist ein Double?",
            correctAnswers: [
                'Eine Gleitkommazahl',
            ],
            possibleAnswers: [
                'Eine Ganzzahl',
                'Eine Warheitswert',
                'Eine Gleitkommazahl',
            ],
            subject: subject,
            isMultipleChoice: true
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
