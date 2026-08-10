#!/usr/bin/env python3
"""Build the privacy-safe, ATS-friendly public resume linked from the site."""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import Frame, Paragraph, Spacer


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "assets" / "john-villanueva-resume.pdf"

PAPER = HexColor("#FBF8F2")
NAVY = HexColor("#102A34")
RED = HexColor("#A43A42")
GOLD = HexColor("#D7A85A")
INK = HexColor("#243238")
MUTED = HexColor("#5C5B56")
LINE = HexColor("#D8D0C4")

FONT_DIR = Path("/usr/share/fonts/truetype/dejavu")
FONT_REGULAR = "DejaVuSans"
FONT_BOLD = "DejaVuSans-Bold"
FONT_DISPLAY = "DejaVuSerif-Bold"


def register_fonts():
    """Embed stable fonts so the PDF renders consistently."""
    pdfmetrics.registerFont(TTFont(FONT_REGULAR, FONT_DIR / "DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont(FONT_BOLD, FONT_DIR / "DejaVuSans-Bold.ttf"))
    pdfmetrics.registerFont(TTFont(FONT_DISPLAY, FONT_DIR / "DejaVuSerif-Bold.ttf"))


def section(title, items, styles):
    return [
        Paragraph(title.upper(), styles["section"]),
        Spacer(1, 2.5),
        *items,
        Spacer(1, 5.5),
    ]


def role(title, meta, bullets, styles):
    return [
        Paragraph(title, styles["role"]),
        Paragraph(meta, styles["meta"]),
        Spacer(1, 1.5),
        *(Paragraph(text, styles["bullet"]) for text in bullets),
        Spacer(1, 3.5),
    ]


def build_resume(output_path=OUTPUT):
    register_fonts()
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    canvas = Canvas(str(output_path), pagesize=letter, pageCompression=1)
    canvas.setTitle("John Villanueva - ATS-Friendly Public Resume")
    canvas.setAuthor("John Villanueva")
    canvas.setCreator("build-public-resume.py")
    canvas.setSubject(
        "Nursing, patient care, education, credentials, business, leadership, and professional capabilities"
    )

    page_width, page_height = letter
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, page_width, page_height, stroke=0, fill=1)

    # A single left-to-right header keeps extraction order linear for ATS tools.
    canvas.setFillColor(NAVY)
    canvas.setFont(FONT_DISPLAY, 20.5)
    canvas.drawString(38, 750, "JOHN VILLANUEVA")
    canvas.setFillColor(INK)
    canvas.setFont(FONT_BOLD, 9.2)
    canvas.drawString(38, 733, "BSN Candidate | California CNA | Former Business Banking Associate")
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_REGULAR, 7.8)
    contact = "johnfvillanueva.com/contact.html  |  linkedin.com/in/johnfvillanueva"
    canvas.drawString(38, 718, contact)
    contact_width = stringWidth("johnfvillanueva.com/contact.html", FONT_REGULAR, 7.8)
    canvas.linkURL(
        "https://johnfvillanueva.com/contact.html",
        (38, 716, 38 + contact_width, 727),
        relative=0,
    )
    linkedin_x = 38 + stringWidth(
        "johnfvillanueva.com/contact.html  |  ", FONT_REGULAR, 7.8
    )
    canvas.linkURL(
        "https://www.linkedin.com/in/johnfvillanueva/",
        (
            linkedin_x,
            716,
            linkedin_x + stringWidth("linkedin.com/in/johnfvillanueva", FONT_REGULAR, 7.8),
            727,
        ),
        relative=0,
    )

    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(1.4)
    canvas.line(36, 705, 576, 705)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(3)
    canvas.line(36, 705, 132, 705)

    base = getSampleStyleSheet()
    styles = {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=8.0,
            leading=10.2,
            textColor=INK,
            spaceAfter=2.2,
            alignment=TA_LEFT,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading3"],
            fontName=FONT_BOLD,
            fontSize=8.8,
            leading=10.4,
            textColor=RED,
            spaceBefore=0,
            spaceAfter=0,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Heading4"],
            fontName=FONT_BOLD,
            fontSize=9.0,
            leading=10.6,
            textColor=NAVY,
            spaceAfter=0,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.4,
            leading=8.8,
            textColor=MUTED,
            spaceAfter=0,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.7,
            leading=9.7,
            textColor=INK,
            leftIndent=10,
            firstLineIndent=-7,
            bulletIndent=0,
            spaceAfter=1.1,
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=base["BodyText"],
            fontName=FONT_REGULAR,
            fontSize=7.65,
            leading=9.6,
            textColor=INK,
            spaceAfter=1.5,
        ),
    }

    flow = []
    flow.extend(
        section(
            "Professional Summary",
            [
                Paragraph(
                    "California Certified Nursing Assistant and BSN candidate with "
                    "1,000+ combined hours of direct patient contact across paid CNA care "
                    "and supervised clinical practice. Brings an earlier foundation in business "
                    "banking, marketing, leadership, technology, and client service.",
                    styles["body"],
                ),
                Paragraph(
                    "Known for clear communication, adaptability, practical systems thinking, "
                    "and respectful patient-centered care.",
                    styles["body"],
                ),
            ],
            styles,
        )
    )
    flow.extend(
        section(
            "Healthcare Experience",
            [
                *role(
                    "Certified Nursing Assistant",
                    "Skilled nursing and sub-acute care | 2026-Present",
                    [
                        "<bullet>&bull;</bullet>Provide direct resident care including activities of daily living, mobility, transfers, repositioning, toileting, feeding, hygiene, comfort, vital signs, and intake/output observations.",
                        "<bullet>&bull;</bullet>Report changes in condition and support accurate handoff, PointClickCare workflows, infection prevention, fall prevention, skin safety, rehabilitation, and discharge readiness.",
                    ],
                    styles,
                ),
                *role(
                    "Student Nurse / Clinical Nursing Student",
                    "Nightingale College supervised clinical practice | 2024-Present",
                    [
                        "<bullet>&bull;</bullet>Develop clinical judgment through assessment, SBAR, medication workflow, patient teaching, care planning, safety, and interdisciplinary communication.",
                        "<bullet>&bull;</bullet>Supervised experience includes head-to-toe assessment, wound and urostomy care, insulin administration, IV discontinuation, nebulizer treatment, and mobility support.",
                    ],
                    styles,
                ),
            ],
            styles,
        )
    )
    flow.extend(
        section(
            "Education and RN Path",
            [
                Paragraph(
                    "<b>Bachelor of Science in Nursing</b> - Nightingale College | Expected April 2027 | GPA 3.84 | Sigma Theta Tau, inducted August 2026",
                    styles["compact"],
                ),
                Paragraph(
                    "<b>BS Business Administration</b> - California State University, East Bay | 2022 | GPA 3.82 | Marketing Management | Japanese Language and Culture minor | AMA chapter president",
                    styles["compact"],
                ),
                Paragraph(
                    "<b>Associate Degrees / Honors</b> - Los Medanos College | 2015 | GPA 3.5 | Math and Science; Arts and Humanities; Behavioral and Social Sciences; Honors Scholar",
                    styles["compact"],
                ),
                Paragraph(
                    "<b>RN path:</b> Targeting NCLEX-RN May-June 2027, subject to eligibility and authorization to test. Seeking a structured new-graduate RN residency following licensure in Summer 2027; Bay Area and Sacramento region; night and rotating schedules welcome.",
                    styles["compact"],
                ),
            ],
            styles,
        )
    )
    flow.extend(
        section(
            "Credentials",
            [
                Paragraph(
                    "California Certified Nursing Assistant - active | AHA BLS Provider - current | Basic EKG Interpretation - completed Aug 1, 2026 | ACLS - completed Aug 12, 2026 | PALS - completed Aug 12, 2026",
                    styles["compact"],
                ),
                Paragraph(
                    "Additional training: dementia care, infection control, HIPAA, resident safety, and medication-safety education.",
                    styles["compact"],
                ),
            ],
            styles,
        )
    )
    flow.extend(
        section(
            "Earlier Business and Leadership Experience",
            [
                Paragraph(
                    "<b>Business Banking Development Associate, PNC Bank | 2022-2023:</b> Supported business bankers and established small-business clients through relationship management, lending and treasury exposure, confidential document coordination, CRM/Salesforce tracking, and service issue resolution.",
                    styles["compact"],
                ),
                Paragraph(
                    "<b>Selected earlier roles:</b> Lead Web Development Associate, 3STEPS4WARD (2023); Marketing Director, COPMORE Partners (2021); Customer Service Supervisor III, Fry's Electronics (2018-2019).",
                    styles["compact"],
                ),
            ],
            styles,
        )
    )
    flow.extend(
        section(
            "Core Skills, Projects, and Recognition",
            [
                Paragraph(
                    "Direct patient care | Therapeutic communication | Vital signs | Clinical observation | SBAR | Safe transfers | Infection prevention | PointClickCare exposure | Patient teaching | Client service | Leadership | CRM/Salesforce | Japanese language | Digital projects",
                    styles["compact"],
                ),
                Paragraph(
                    "Built a multi-route nursing pharmacology practice tool with answer rationales and a broader 23-experience browser library. Honors research presentations at Stanford University and UC Berkeley; Smith Center Pitch Day competition finalist; American Marketing Association chapter president.",
                    styles["compact"],
                ),
            ],
            styles,
        )
    )

    body_frame = Frame(
        38,
        45,
        536,
        650,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    body_frame.addFromList(flow, canvas)
    if flow:
        raise RuntimeError(f"Resume content overflowed its one-page frame ({len(flow)} blocks remain)")

    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.6)
    canvas.line(36, 35, 576, 35)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT_REGULAR, 6.7)
    canvas.drawString(36, 23, "Public resume | Contact: johnfvillanueva.com/contact.html")
    canvas.drawRightString(576, 23, "Updated August 2026 | Verification available to employers")

    canvas.save()
    return output_path


if __name__ == "__main__":
    print(build_resume())
