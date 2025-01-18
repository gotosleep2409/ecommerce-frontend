import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FaqService} from "../../../../services/faq.service";

@Component({
  selector: 'app-chatbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbox.component.html',
  styleUrl: './chatbox.component.scss'
})
export class ChatboxComponent implements OnInit{
  isChatboxOpen = false
  chatInput: any = ''
  messages: any = []
  faqs: string[] = []
  selectedQuestion: string = ''

  constructor(private faqService: FaqService){
    this.faqService.getFAQs().subscribe((data) => {
      this.faqs = data
    })
  }

  ngOnInit() {
  }

  toggleChatbox(){
    this.isChatboxOpen = !this.isChatboxOpen
  }

  sendMessage(){
    if (this.chatInput.trim()) {
      const question = this.chatInput.trim()
      this.messages.push({ sender: 'You', text: question })
      this.faqService.askQuestion(question).subscribe(
        (response) => {
          this.messages.push({ sender: 'Admin', text: response.answer })
        },
        (error) => {
          console.log(error)
          this.messages.push({ sender: 'Admin', text: 'Lỗi: Không có phản hồi.' })
        }
      )
      this.chatInput = ''
    }
  }

  onKeyPress(event: any){
    if (event.key === 'Enter') {
      this.sendMessage()
    }
  }

  sendQuestion(question: string) {
    this.selectedQuestion = question
    this.messages.push(`You: ${question}`)
  }
}
