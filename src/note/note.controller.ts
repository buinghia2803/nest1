import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) { }
  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId)
  }

  @Get(':id')
  getNoteById(@Param('id') noteId: number) {
    return this.noteService.getNoteById(noteId)
  }

  @Post()
  insertNote(
    @GetUser('id') userId: number,
    @Body() insertNoteDTO: InsertNoteDTO
  ) {
    return this.noteService.insertNote(userId, insertNoteDTO)
  }

  @Patch()
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() updateNoteDTO: UpdateNoteDTO
  ) {
    return this.noteService.updateNoteById(noteId, updateNoteDTO)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNoteById(noteId)
  }
}
